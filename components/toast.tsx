import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  visible: boolean;
  onHide?: () => void;
  position?: 'top' | 'bottom';
}

const TOAST_COLORS = {
  success: {
    background: '#10B981',
    icon: '#FFFFFF',
    text: '#FFFFFF',
  },
  error: {
    background: '#EF4444',
    icon: '#FFFFFF',
    text: '#FFFFFF',
  },
  info: {
    background: '#3B82F6',
    icon: '#FFFFFF',
    text: '#FFFFFF',
  },
};

const TOAST_ICONS: Record<ToastType, keyof typeof MaterialIcons.glyphMap> = {
  success: 'check-circle',
  error: 'error',
  info: 'info',
};

export default function Toast({
  type,
  title,
  message,
  duration = 3000,
  visible,
  onHide,
  position = 'top',
}: ToastProps) {
  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (visible) {
      translateY.value = withSequence(
        withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }),
        withDelay(
          duration,
          withTiming(position === 'top' ? -100 : 100, {
            duration: 300,
            easing: Easing.in(Easing.cubic),
          })
        )
      );

      opacity.value = withSequence(
        withTiming(1, {
          duration: 300,
        }),
        withDelay(
          duration,
          withTiming(0, {
            duration: 300,
          }, (finished) => {
            if (finished && onHide) {
              runOnJS(onHide)();
            }
          })
        )
      );

      scale.value = withSequence(
        withTiming(1, {
          duration: 300,
          easing: Easing.out(Easing.back(1.5)),
        }),
        withDelay(
          duration,
          withTiming(0.8, {
            duration: 300,
          })
        )
      );
    } else {
      translateY.value = withTiming(position === 'top' ? -100 : 100, {
        duration: 300,
      });
      opacity.value = withTiming(0, {
        duration: 300,
      });
      scale.value = withTiming(0.8, {
        duration: 300,
      });
    }
  }, [visible, duration, position, onHide, translateY, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  const colors = TOAST_COLORS[type];
  const iconName = TOAST_ICONS[type];

  if (!visible && opacity.value === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        position === 'top' ? styles.topPosition : styles.bottomPosition,
        animatedStyle,
      ]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onHide}
        style={[
          styles.toast,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <MaterialIcons
              name={iconName}
              size={24}
              color={colors.icon}
              style={styles.icon}
            />
            <Text style={[styles.title, { color: colors.text }]}>
              {title}
            </Text>
          </View>
          {message && (
            <Text style={[styles.message, { color: colors.text }]}>
              {message}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  topPosition: {
    top: Platform.select({
      ios: 50,
      android: 30,
      default: 30,
    }),
  },
  bottomPosition: {
    bottom: Platform.select({
      ios: 40,
      android: 30,
      default: 30,
    }),
  },
  toast: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  contentContainer: {
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  message: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 36,
    lineHeight: 20,
  },
});