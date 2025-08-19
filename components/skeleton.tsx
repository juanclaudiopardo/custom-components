import React, { useEffect } from 'react';
import { View, ViewStyle, StyleSheet, DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

interface BaseSkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  backgroundColor?: string;
  highlightColor?: string;
  animationSpeed?: number;
  style?: ViewStyle;
}

interface RectangleSkeletonProps extends BaseSkeletonProps {
  variant?: 'rectangle';
}

interface CircleSkeletonProps extends BaseSkeletonProps {
  variant: 'circle';
  size?: number;
}

type SkeletonProps = RectangleSkeletonProps | CircleSkeletonProps;

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {
    variant = 'rectangle',
    backgroundColor = '#E1E9EE',
    highlightColor = '#F2F8FC',
    animationSpeed = 1000,
    style,
  } = props;

  const translateX = useSharedValue(-1);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(1, {
        duration: animationSpeed,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false
    );
  }, [animationSpeed, translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-1, -0.5, 0, 0.5, 1],
      [0.3, 0.5, 0.8, 0.5, 0.3]
    );

    return {
      opacity,
    };
  });

  const shimmerAnimatedStyle = useAnimatedStyle(() => {
    const translateXValue = interpolate(
      translateX.value,
      [-1, 1],
      [-100, 100]
    );

    return {
      transform: [{ translateX: translateXValue }],
    };
  });

  const getSkeletonStyle = (): ViewStyle => {
    if (variant === 'circle' && 'size' in props) {
      const size = props.size || 50;
      return {
        width: size,
        height: size,
        borderRadius: size / 2,
      };
    }

    return {
      width: props.width || '100%',
      height: props.height || 20,
      borderRadius: props.borderRadius || (variant === 'rectangle' ? 4 : 0),
    };
  };

  const containerStyle: ViewStyle = {
    ...getSkeletonStyle(),
    backgroundColor,
    overflow: 'hidden',
    ...style,
  };

  return (
    <View style={containerStyle}>
      <Animated.View style={[styles.shimmerBase, animatedStyle]}>
        <Animated.View
          style={[
            styles.shimmer,
            shimmerAnimatedStyle,
            {
              backgroundColor: highlightColor,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerBase: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
});

interface SkeletonGroupProps {
  children: React.ReactNode;
  gap?: number;
  direction?: 'row' | 'column';
  style?: ViewStyle;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  children,
  gap = 10,
  direction = 'column',
  style,
}) => {
  const containerStyle: ViewStyle = {
    flexDirection: direction,
    gap,
    ...style,
  };

  return <View style={containerStyle}>{children}</View>;
};

interface SkeletonTextProps extends BaseSkeletonProps {
  lines?: number;
  lineHeight?: number;
  lineGap?: number;
  lastLineWidth?: DimensionValue;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lineHeight = 16,
  lineGap = 8,
  lastLineWidth = '60%',
  ...props
}) => {
  return (
    <SkeletonGroup gap={lineGap}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangle"
          height={lineHeight}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          {...props}
        />
      ))}
    </SkeletonGroup>
  );
};

interface SkeletonCardProps extends BaseSkeletonProps {
  imageHeight?: number;
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  padding?: number;
  borderRadius?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  imageHeight = 200,
  showImage = true,
  showTitle = true,
  showDescription = true,
  padding = 16,
  borderRadius = 12,
  backgroundColor = '#E1E9EE',
  highlightColor = '#F2F8FC',
  animationSpeed = 1000,
  style,
}) => {
  return (
    <View
      style={[
        {
          borderRadius,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        },
        style,
      ]}
    >
      {showImage && (
        <Skeleton
          variant="rectangle"
          width="100%"
          height={imageHeight}
          borderRadius={0}
          backgroundColor={backgroundColor}
          highlightColor={highlightColor}
          animationSpeed={animationSpeed}
        />
      )}
      <View style={{ padding }}>
        {showTitle && (
          <Skeleton
            variant="rectangle"
            width="70%"
            height={24}
            backgroundColor={backgroundColor}
            highlightColor={highlightColor}
            animationSpeed={animationSpeed}
            style={{ marginBottom: 12 }}
          />
        )}
        {showDescription && (
          <SkeletonText
            lines={3}
            backgroundColor={backgroundColor}
            highlightColor={highlightColor}
            animationSpeed={animationSpeed}
          />
        )}
      </View>
    </View>
  );
};