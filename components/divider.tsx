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
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Width or thickness of the divider */
  width?: number;
  /** Spacing around the divider */
  spacing?: number;
}

/**
 * Divider component to separate sections
 */
export const Divider: React.FC<DividerProps> = ({
  color = '#E0E0E0',
  style,
  orientation = 'horizontal',
  width = 1,
  spacing = 0,
  ...rest
}) => {
  const isVertical = orientation === 'vertical';

  const dividerStyle = isVertical
    ? {
        width: width,
        height: '100%' as DimensionValue,
        backgroundColor: color,
        marginHorizontal: spacing,
      }
    : {
        height: width,
        width: '100%' as DimensionValue,
        backgroundColor: color,
        marginVertical: spacing,
      };

  return <View style={[dividerStyle, style]} {...rest} />;
};

