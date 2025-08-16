import React, { useMemo, useCallback } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  AccessibilityState,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Color palette for button components
 * @internal
 */
const COLORS = {
  primary: '#007AFF',
  primaryPressed: '#0056CC',
  disabled: '#B0B0B0',
  white: '#FFFFFF',
  transparent: 'transparent',
  ghostPressed: '#F0F8FF',
} as const;

/**
 * Available button visual variants
 * @public
 */
export type ButtonVariant = 'default' | 'outline' | 'ghost';

/**
 * Available button sizes
 * @public
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Base properties for the Button component
 * @interface BaseButtonProps
 */
interface BaseButtonProps {
  /**
   * The text to display inside the button
   * @required
   * @example "Save", "Cancel", "Submit"
   */
  title: string;

  /**
   * Visual style variant of the button
   * @default 'default'
   * 
   * - `default`: Solid background with primary color
   * - `outline`: Transparent background with colored border
   * - `ghost`: Transparent background and border
   */
  variant?: ButtonVariant;

  /**
   * Size of the button affecting padding and text size
   * @default 'medium'
   * 
   * - `small`: 32px min height, 14px font
   * - `medium`: 44px min height, 16px font
   * - `large`: 56px min height, 18px font
   */
  size?: ButtonSize;

  /**
   * Disables the button preventing user interaction
   * @default false
   * 
   * When true:
   * - Button becomes non-interactive
   * - Opacity is reduced to 60%
   * - onPress events are blocked
   * - Accessibility state is updated
   */
  disabled?: boolean;

  /**
   * Shows a loading spinner replacing button content
   * @default false
   * 
   * When true:
   * - ActivityIndicator replaces text and icons
   * - Button becomes non-interactive
   * - onPress events are blocked
   * - Accessibility state shows "busy"
   */
  loading?: boolean;

  /**
   * Custom color for the loading spinner
   * @default '#FFFFFF' for default variant, '#007AFF' for outline/ghost
   * @example "#FF0000", "rgb(255, 0, 0)", "red"
   */
  spinnerColor?: string;

  /**
   * Icon component to display on the left side of the text
   * @example <Ionicons name="save" size={20} color="white" />
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon component to display on the right side of the text
   * @example <Ionicons name="arrow-forward" size={20} color="white" />
   */
  rightIcon?: React.ReactNode;

  /**
   * Enable haptic feedback on button press (mobile only)
   * @default false
   * @platform iOS, Android
   * 
   * Provides tactile feedback using the device's vibration motor.
   * Uses Light impact style for subtle feedback.
   * No effect on web platform.
   */
  enableHaptics?: boolean;

  /**
   * Custom label for screen readers
   * @default Uses the `title` prop value
   * @accessibility
   * 
   * Screen readers will announce this text when the button is focused.
   * Useful when the visual text isn't descriptive enough.
   * 
   * @example
   * title="X" accessibilityLabel="Close dialog"
   */
  accessibilityLabel?: string;

  /**
   * Hint text for screen readers describing the button's action
   * @accessibility
   * 
   * Provides additional context about what will happen when activated.
   * Read after the label by screen readers.
   * 
   * @example "Double tap to submit the form"
   */
  accessibilityHint?: string;
}

/**
 * Button component props extending React Native's Pressable
 * @public
 */
export type ButtonProps = BaseButtonProps &
  Omit<PressableProps, 'style' | 'disabled'> & {
    /**
     * Custom styles for the button container
     * Applied after all variant styles
     */
    style?: ViewStyle;
    
    /**
     * Custom styles for the button text
     * Applied after all variant text styles
     */
    titleStyle?: TextStyle;
  };

/**
 * A versatile, accessible, and performant button component for React Native.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Button 
 *   title="Save" 
 *   onPress={handleSave}
 * />
 * 
 * // With variant and size
 * <Button 
 *   title="Cancel"
 *   variant="outline"
 *   size="small"
 *   onPress={handleCancel}
 * />
 * 
 * // With icons and haptic feedback
 * <Button
 *   title="Download"
 *   leftIcon={<Icon name="download" />}
 *   enableHaptics
 *   onPress={handleDownload}
 * />
 * 
 * // Loading state
 * <Button
 *   title="Processing..."
 *   loading={isProcessing}
 *   onPress={handleSubmit}
 * />
 * 
 * // Accessible button
 * <Button
 *   title="×"
 *   accessibilityLabel="Close dialog"
 *   accessibilityHint="Double tap to close this dialog"
 *   variant="ghost"
 *   onPress={closeDialog}
 * />
 * ```
 * 
 * @remarks
 * - Component is memoized for performance
 * - Supports three visual variants: default, outline, ghost
 * - Fully accessible with screen reader support
 * - Optional haptic feedback on mobile devices
 * - Automatically handles disabled and loading states
 * 
 * @since 1.0.0
 */
const Button: React.FC<ButtonProps> = React.memo(({
  title,
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  spinnerColor,
  leftIcon,
  rightIcon,
  enableHaptics = false,
  accessibilityLabel,
  accessibilityHint,
  style,
  titleStyle,
  onPress,
  ...pressableProps
}) => {
  /**
   * Computed disabled state - true when explicitly disabled OR loading
   */
  const isDisabled = disabled || loading;

  /**
   * Accessibility state object for screen readers
   * Updates when disabled or loading state changes
   */
  const accessibilityState: AccessibilityState = useMemo(() => ({
    disabled: isDisabled,
    busy: loading,
  }), [isDisabled, loading]);

  /**
   * Generates button container styles based on variant, size, and state
   * @memoized Recalculates only when dependencies change
   */
  const getButtonStyles = useMemo(() => (pressed: boolean): ViewStyle[] => {
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
  }, [variant, size, disabled, isDisabled]);

  /**
   * Generates text styles based on variant, size, and disabled state
   * @memoized Recalculates only when dependencies change
   */
  const getTextStyles = useMemo((): TextStyle[] => {
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
  }, [variant, size, disabled]);

  /**
   * Determines the color of the loading spinner
   * @memoized Recalculates only when spinnerColor or variant changes
   * @returns Hex color string for the ActivityIndicator
   */
  const getSpinnerColor = useMemo((): string => {
    // If custom spinnerColor is provided, use it
    if (spinnerColor) {
      return spinnerColor;
    }

    // Default color is white for default variant, primary for others
    return variant === 'default' ? COLORS.white : COLORS.primary;
  }, [spinnerColor, variant]);

  /**
   * Calculates horizontal spacing between icons and text
   * @memoized Recalculates only when size changes
   * @returns Pixel value for margin
   */
  const getIconSpacing = useMemo((): number => {
    switch (size) {
      case 'small':
        return 6;
      case 'large':
        return 10;
      default:
        return 8;
    }
  }, [size]);

  /**
   * Handles button press events with optional haptic feedback
   * 
   * @param event - The gesture responder event from Pressable
   * 
   * Behavior:
   * 1. Checks if button is disabled or loading
   * 2. Triggers haptic feedback if enabled (mobile only)
   * 3. Calls the provided onPress handler
   * 
   * @memoized Prevents unnecessary re-creation
   */
  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (!isDisabled) {
      // Trigger haptic feedback if enabled and on mobile
      if (enableHaptics && Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      // Call the original onPress handler
      onPress?.(event);
    }
  }, [isDisabled, enableHaptics, onPress]);

  return (
    <Pressable
      {...pressableProps}
      disabled={isDisabled}
      onPress={handlePress}
      style={({ pressed }) => [...getButtonStyles(pressed), style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityState}
    >
      <View style={styles.buttonContent}>
        {loading ? (
          <ActivityIndicator color={getSpinnerColor} />
        ) : (
          <>
            {/* Left icon */}
            {leftIcon && (
              <View
                style={[
                  styles.iconContainer,
                  { marginRight: getIconSpacing },
                ]}
              >
                {leftIcon}
              </View>
            )}

            {/*  Button title */}
            <Text style={[...getTextStyles, titleStyle]}>{title}</Text>

            {/*  Right icon */}
            {rightIcon && (
              <View
                style={[styles.iconContainer, { marginLeft: getIconSpacing }]}
              >
                {rightIcon}
              </View>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
});

/**
 * Display name for React DevTools
 */
Button.displayName = 'Button';

/**
 * StyleSheet containing all button style variations
 * @internal
 */
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
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  defaultText: {
    color: COLORS.white,
  },
  defaultPressed: {
    backgroundColor: COLORS.primaryPressed,
    borderColor: COLORS.primaryPressed,
  },
  defaultDisabled: {
    backgroundColor: COLORS.disabled,
    borderColor: COLORS.disabled,
  },
  defaultDisabledText: {
    color: COLORS.white,
  },

  // Outline variant
  outlineButton: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.primary,
  },
  outlineText: {
    color: COLORS.primary,
  },
  outlinePressed: {
    backgroundColor: COLORS.ghostPressed,
    borderColor: COLORS.primaryPressed,
  },
  outlineDisabled: {
    borderColor: COLORS.disabled,
  },
  outlineDisabledText: {
    color: COLORS.disabled,
  },

  // Ghost variant
  ghostButton: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.transparent,
  },
  ghostText: {
    color: COLORS.primary,
  },
  ghostPressed: {
    backgroundColor: COLORS.transparent,
  },
  ghostDisabled: {
    backgroundColor: COLORS.transparent,
  },
  ghostDisabledText: {
    color: COLORS.disabled,
  },

  // Global states
  disabledText: {
    // Applied to all types when disabled
  },
});

/**
 * Export the Button component as default
 * 
 * @example
 * import Button from '@/components/button';
 * 
 * @example 
 * import { ButtonVariant, ButtonSize } from '@/components/button';
 */
export default Button;
