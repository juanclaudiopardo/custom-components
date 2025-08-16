import {
  DimensionValue,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface DividerProps extends ViewProps {
  /** Color of the divider */
  color?: string;
  /** Whether there should be a margin */
  inset?: boolean;
  /** Type of margin */
  insetType?: 'left' | 'right' | 'middle';
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Width or thickness of the divider */
  width?: number;
}

/**
 * Divider component to separate sections
 */
export const Divider: React.FC<DividerProps> = ({
  color = 'red',
  inset = false,
  insetType = 'left',
  style,
  orientation = 'horizontal',
  width = 1,
  ...rest
}) => {
  const isVertical = orientation === 'vertical';

  // Base styles for the divider
  const insetStyle = getInsetStyle(insetType, inset, isVertical);

  const dividerStyle = isVertical
    ? {
        width: width,
        height: '100%' as DimensionValue,
        backgroundColor: color,
      }
    : {
        height: width,
        width: '100%' as DimensionValue,
        backgroundColor: color,
      };

  return <View style={[dividerStyle, insetStyle, style]} {...rest} />;
};

// Helper function to get margin style based on the type
const getInsetStyle = (
  insetType: 'left' | 'right' | 'middle',
  inset: boolean,
  isVertical: boolean
) => {
  if (!inset) return {};

  const insetValue = 16;

  if (isVertical) {
    return {
      marginVertical: insetValue,
    };
  }

  if (insetType === 'left') {
    return {
      marginLeft: insetValue,
    };
  }

  if (insetType === 'right') {
    return {
      marginRight: insetValue,
    };
  }

  if (insetType === 'middle') {
    return {
      marginHorizontal: insetValue,
    };
  }

  return {};
};
