// components/input.tsx
import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// Input specific props
interface BaseInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

// Extend TextInput props using intersection types
type InputProps = BaseInputProps &
  Omit<TextInputProps, 'style'> & {
    style?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
  };

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      onLeftIconPress,
      onRightIconPress,
      style,
      inputStyle,
      labelStyle,
      errorStyle,
      editable = true,
      ...textInputProps
    },
    ref
  ) => {
    // Function to get container styles
    const getContainerStyles = (): ViewStyle[] => {
      const baseStyles: ViewStyle[] = [styles.container];
      if (style) baseStyles.push(style);
      return baseStyles;
    };

    // Function to get input container styles
    const getInputContainerStyles = (): ViewStyle[] => {
      const baseStyles: ViewStyle[] = [styles.inputContainer];

      if (error) {
        baseStyles.push(styles.errorInputContainer);
      }
      if (!editable) {
        baseStyles.push(styles.disabledInputContainer);
      }

      return baseStyles;
    };

    // Function to get input styles
    const getInputStyles = (): TextStyle[] => {
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
    };

    // Function to get label styles
    const getLabelStyles = (): TextStyle[] => {
      const baseLabelStyles: TextStyle[] = [styles.baseLabel];
      if (labelStyle) baseLabelStyles.push(labelStyle);
      return baseLabelStyles;
    };

    // Function to get error styles
    const getErrorStyles = (): TextStyle[] => {
      const baseErrorStyles: TextStyle[] = [styles.baseError];
      if (errorStyle) baseErrorStyles.push(errorStyle);
      return baseErrorStyles;
    };

    return (
      <View style={getContainerStyles()}>
        {/* Label */}
        {label && <Text style={getLabelStyles()}>{label}</Text>}

        {/* Input Container */}
        <View style={getInputContainerStyles()}>
          {/* Left Icon */}
          {leftIcon && (
            <TouchableOpacity
              style={styles.leftIconContainer}
              onPress={onLeftIconPress}
              disabled={!onLeftIconPress}
              activeOpacity={onLeftIconPress ? 0.7 : 1}
            >
              {leftIcon}
            </TouchableOpacity>
          )}

          {/* Input */}
          <TextInput
            ref={ref}
            style={getInputStyles()}
            editable={editable}
            placeholderTextColor={!editable ? '#B0B0B0' : '#9CA3AF'}
            {...textInputProps}
          />

          {/* Right Icon */}
          {rightIcon && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
              activeOpacity={onRightIconPress ? 0.7 : 1}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

        {/* Error Message */}
        {error && <Text style={getErrorStyles()}>{error}</Text>}
      </View>
    );
  }
);

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
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    minHeight: 44,
  },
  baseInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '400',
    color: '#1F2937',
  },
  baseLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  baseError: {
    fontSize: 12,
    fontWeight: '400',
    color: '#EF4444',
    marginTop: 4,
  },

  // Input container states
  errorInputContainer: {
    borderColor: '#EF4444',
  },
  disabledInputContainer: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },

  // Input states
  disabledInput: {
    color: '#9CA3AF',
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

Input.displayName = 'Input';

export default Input;
