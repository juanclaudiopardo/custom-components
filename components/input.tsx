// components/input.tsx
import React, { forwardRef, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  AccessibilityState,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Color palette for input components
 * @internal
 */
const COLORS = {
  text: {
    primary: '#1F2937',
    secondary: '#374151',
    disabled: '#9CA3AF',
    placeholder: '#9CA3AF',
    error: '#EF4444',
  },
  border: {
    default: '#D1D5DB',
    error: '#EF4444',
    disabled: '#E5E7EB',
  },
  background: {
    default: '#FFFFFF',
    disabled: '#F9FAFB',
  },
} as const;

// Input specific props
interface BaseInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  /** Enable haptic feedback for icon interactions (mobile only) */
  enableHaptics?: boolean;
  /** Custom accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Accessibility hint for screen readers */
  accessibilityHint?: string;
}

// Extend TextInput props using intersection types
type InputProps = BaseInputProps &
  Omit<TextInputProps, 'style'> & {
    style?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
  };

const Input = React.memo(forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      onLeftIconPress,
      onRightIconPress,
      enableHaptics = false,
      accessibilityLabel,
      accessibilityHint,
      style,
      inputStyle,
      labelStyle,
      errorStyle,
      editable = true,
      ...textInputProps
    },
    ref
  ) => {
    // Accessibility state for screen readers
    const accessibilityState: AccessibilityState = useMemo(() => ({
      disabled: !editable,
    }), [editable]);

    // Function to get container styles
    const getContainerStyles = useMemo((): ViewStyle[] => {
      const baseStyles: ViewStyle[] = [styles.container];
      if (style) baseStyles.push(style);
      return baseStyles;
    }, [style]);

    // Function to get input container styles
    const getInputContainerStyles = useMemo((): ViewStyle[] => {
      const baseStyles: ViewStyle[] = [styles.inputContainer];

      if (error) {
        baseStyles.push(styles.errorInputContainer);
      }
      if (!editable) {
        baseStyles.push(styles.disabledInputContainer);
      }

      return baseStyles;
    }, [error, editable]);

    // Function to get input styles
    const getInputStyles = useMemo((): TextStyle[] => {
      const baseStyles: TextStyle[] = [styles.baseInput];

      if (!editable) {
        baseStyles.push(styles.disabledInput);
      }

      // Adjust padding if there are icons
      if (leftIcon) {
        baseStyles.push(styles.inputWithLeftIcon);
      }
      if (rightIcon) {
        baseStyles.push(styles.inputWithRightIcon);
      }

      if (inputStyle) baseStyles.push(inputStyle);
      return baseStyles;
    }, [editable, leftIcon, rightIcon, inputStyle]);

    // Function to get label styles
    const getLabelStyles = useMemo((): TextStyle[] => {
      const baseLabelStyles: TextStyle[] = [styles.baseLabel];
      if (labelStyle) baseLabelStyles.push(labelStyle);
      return baseLabelStyles;
    }, [labelStyle]);

    // Function to get error styles
    const getErrorStyles = useMemo((): TextStyle[] => {
      const baseErrorStyles: TextStyle[] = [styles.baseError];
      if (errorStyle) baseErrorStyles.push(errorStyle);
      return baseErrorStyles;
    }, [errorStyle]);

    // Handle left icon press with haptic feedback
    const handleLeftIconPress = useCallback((event: GestureResponderEvent) => {
      if (enableHaptics && Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onLeftIconPress?.();
    }, [enableHaptics, onLeftIconPress]);

    // Handle right icon press with haptic feedback
    const handleRightIconPress = useCallback((event: GestureResponderEvent) => {
      if (enableHaptics && Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onRightIconPress?.();
    }, [enableHaptics, onRightIconPress]);

    return (
      <View style={getContainerStyles}>
        {/* Label */}
        {label && <Text style={getLabelStyles}>{label}</Text>}

        {/* Input Container */}
        <View style={getInputContainerStyles}>
          {/* Left Icon */}
          {leftIcon && (
            <TouchableOpacity
              style={styles.leftIconContainer}
              onPress={handleLeftIconPress}
              disabled={!onLeftIconPress}
              activeOpacity={onLeftIconPress ? 0.7 : 1}
              accessibilityRole="button"
              accessibilityLabel={`Left icon${onLeftIconPress ? ' button' : ''}`}
            >
              {leftIcon}
            </TouchableOpacity>
          )}

          {/* Input */}
          <TextInput
            ref={ref}
            style={getInputStyles}
            editable={editable}
            placeholderTextColor={!editable ? COLORS.text.disabled : COLORS.text.placeholder}
            accessibilityLabel={accessibilityLabel || label}
            accessibilityHint={accessibilityHint}
            accessibilityState={accessibilityState}
            {...textInputProps}
          />

          {/* Right Icon */}
          {rightIcon && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={handleRightIconPress}
              disabled={!onRightIconPress}
              activeOpacity={onRightIconPress ? 0.7 : 1}
              accessibilityRole="button"
              accessibilityLabel={`Right icon${onRightIconPress ? ' button' : ''}`}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

        {/* Error Message */}
        {error && (
          <Text 
            style={getErrorStyles}
            accessibilityRole="text"
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
));

const styles = StyleSheet.create({
  // Base styles
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border.default,
    backgroundColor: COLORS.background.default,
    minHeight: 44,
  },
  baseInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.text.primary,
  },
  baseLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.secondary,
    marginBottom: 6,
  },
  baseError: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.text.error,
    marginTop: 4,
  },

  // Input container states
  errorInputContainer: {
    borderColor: COLORS.border.error,
  },
  disabledInputContainer: {
    backgroundColor: COLORS.background.disabled,
    borderColor: COLORS.border.disabled,
  },

  // Input states
  disabledInput: {
    color: COLORS.text.disabled,
  },

  // Styles for inputs with icons
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },

  // Icons
  leftIconContainer: {
    paddingLeft: 12,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    paddingRight: 12,
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Export the Input component as default
 * 
 * @example
 * import Input from '@/components/input';
 * 
 * @example 
 * import { InputProps } from '@/components/input';
 */
export default Input;
