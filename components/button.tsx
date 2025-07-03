import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

// Define button variants using discriminated unions
type ButtonVariant = 'default' | 'outline' | 'ghost';

// Button-specific props
interface BaseButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  spinnerColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Extend Pressable props using intersection types
type ButtonProps = BaseButtonProps &
  Omit<PressableProps, 'style' | 'disabled'> & {
    style?: ViewStyle;
    titleStyle?: TextStyle;
  };

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  spinnerColor,
  leftIcon,
  rightIcon,
  style,
  titleStyle,
  ...pressableProps
}) => {
  // Button is functionally disabled if disabled is true or if loading is true
  const isDisabled = disabled || loading;

  // Function to get button styles based on variant
  const getButtonStyles = (pressed: boolean): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.baseButton, styles[`size_${size}`]];

    // Only apply pressed if not functionally disabled
    if (pressed && !isDisabled) baseStyles.push(styles.pressed);

    // Only apply disabled styles when disabled is true (not when loading is true)
    if (disabled) baseStyles.push(styles.disabled);

    switch (variant) {
      case 'outline':
        baseStyles.push(styles.outlineButton);
        if (pressed && !isDisabled) baseStyles.push(styles.outlinePressed);
        if (disabled) baseStyles.push(styles.outlineDisabled);
        break;
      case 'ghost':
        baseStyles.push(styles.ghostButton);
        if (pressed && !isDisabled) baseStyles.push(styles.ghostPressed);
        if (disabled) baseStyles.push(styles.ghostDisabled);
        break;
      default:
        baseStyles.push(styles.defaultButton);
        if (pressed && !isDisabled) baseStyles.push(styles.defaultPressed);
        if (disabled) baseStyles.push(styles.defaultDisabled);
        break;
    }

    return baseStyles;
  };

  // Function to get text styles based on variant
  const getTextStyles = (): TextStyle[] => {
    const baseTextStyles: TextStyle[] = [
      styles.baseText,
      styles[`text_${size}`],
    ];

    // Only apply disabled styles when disabled is true (not when loading is true)
    if (disabled) baseTextStyles.push(styles.disabledText);

    switch (variant) {
      case 'outline':
        baseTextStyles.push(styles.outlineText);
        if (disabled) baseTextStyles.push(styles.outlineDisabledText);
        break;
      case 'ghost':
        baseTextStyles.push(styles.ghostText);
        if (disabled) baseTextStyles.push(styles.ghostDisabledText);
        break;
      default:
        baseTextStyles.push(styles.defaultText);
        if (disabled) baseTextStyles.push(styles.defaultDisabledText);
        break;
    }

    return baseTextStyles;
  };

  // Function to get spinner color based on variant
  const getSpinnerColor = (): string => {
    // If custom spinnerColor is provided, use it
    if (spinnerColor) {
      return spinnerColor;
    }

    // Default color is white
    return '#FFFFFF';
  };

  // ✅ Function to get icon spacing based on size
  const getIconSpacing = (): number => {
    switch (size) {
      case 'small':
        return 6;
      case 'large':
        return 10;
      default:
        return 8;
    }
  };

  return (
    <Pressable
      {...pressableProps}
      disabled={isDisabled}
      style={({ pressed }) => [...getButtonStyles(pressed), style]}
    >
      <View style={styles.buttonContent}>
        {loading ? (
          <ActivityIndicator color={getSpinnerColor()} />
        ) : (
          <>
            {/* Left icon */}
            {leftIcon && (
              <View
                style={[
                  styles.iconContainer,
                  { marginRight: getIconSpacing() },
                ]}
              >
                {leftIcon}
              </View>
            )}

            {/*  Button title */}
            <Text style={[...getTextStyles(), titleStyle]}>{title}</Text>

            {/*  Right icon */}
            {rightIcon && (
              <View
                style={[styles.iconContainer, { marginLeft: getIconSpacing() }]}
              >
                {rightIcon}
              </View>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Base styles
  baseButton: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  baseText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ✅ New style for icon container
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Sizes
  size_small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  size_medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  size_large: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 56,
  },

  // Text sizes
  text_small: {
    fontSize: 14,
    lineHeight: 16,
  },
  text_medium: {
    fontSize: 16,
    lineHeight: 18,
  },
  text_large: {
    fontSize: 18,
    lineHeight: 20,
  },

  // Default variant
  defaultButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  defaultText: {
    color: '#FFFFFF',
  },
  defaultPressed: {
    backgroundColor: '#0056CC',
    borderColor: '#0056CC',
  },
  defaultDisabled: {
    backgroundColor: '#B0B0B0',
    borderColor: '#B0B0B0',
  },
  defaultDisabledText: {
    color: '#FFFFFF',
  },

  // Outline variant
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: '#007AFF',
  },
  outlineText: {
    color: '#007AFF',
  },
  outlinePressed: {
    backgroundColor: '#F0F8FF',
    borderColor: '#0056CC',
  },
  outlineDisabled: {
    borderColor: '#B0B0B0',
  },
  outlineDisabledText: {
    color: '#B0B0B0',
  },

  // Ghost variant
  ghostButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  ghostText: {
    color: '#007AFF',
  },
  ghostPressed: {
    backgroundColor: 'transparent',
  },
  ghostDisabled: {
    backgroundColor: 'transparent',
  },
  ghostDisabledText: {
    color: '#B0B0B0',
  },

  // Global states
  disabledText: {
    // Applied to all types when disabled
  },
});

export default Button;
