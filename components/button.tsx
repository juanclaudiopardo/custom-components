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

// Definimos las variantes del botón usando discriminated unions
type ButtonVariant = 'default' | 'outline' | 'ghost';

// Props específicas del botón
interface BaseButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  spinnerColor?: string;
}

// Extendemos las props de Pressable usando intersection types
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
  style,
  titleStyle,
  ...pressableProps
}) => {
  // El botón está funcionalmente deshabilitado si disabled es true o si loading es true
  const isDisabled = disabled || loading;

  // Función para obtener los estilos del botón según la variante
  const getButtonStyles = (pressed: boolean): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.baseButton, styles[`size_${size}`]];

    // ✅ Solo aplicar pressed si no está deshabilitado funcionalmente
    if (pressed && !isDisabled) baseStyles.push(styles.pressed);

    // ✅ Solo aplicar estilos de disabled cuando disabled es true (no cuando loading es true)
    if (disabled) baseStyles.push(styles.disabled);

    switch (variant) {
      case 'outline':
        baseStyles.push(styles.outlineButton);
        if (pressed && !isDisabled) baseStyles.push(styles.outlinePressed);
        if (disabled) baseStyles.push(styles.outlineDisabled); // ✅ Solo cuando disabled, no loading
        break;
      case 'ghost':
        baseStyles.push(styles.ghostButton);
        if (pressed && !isDisabled) baseStyles.push(styles.ghostPressed);
        if (disabled) baseStyles.push(styles.ghostDisabled); // ✅ Solo cuando disabled, no loading
        break;
      default:
        baseStyles.push(styles.defaultButton);
        if (pressed && !isDisabled) baseStyles.push(styles.defaultPressed);
        if (disabled) baseStyles.push(styles.defaultDisabled); // ✅ Solo cuando disabled, no loading
        break;
    }

    return baseStyles;
  };

  // Función para obtener los estilos del texto según la variante
  const getTextStyles = (): TextStyle[] => {
    const baseTextStyles: TextStyle[] = [
      styles.baseText,
      styles[`text_${size}`],
    ];

    // ✅ Solo aplicar estilos de disabled cuando disabled es true (no cuando loading es true)
    if (disabled) baseTextStyles.push(styles.disabledText);

    switch (variant) {
      case 'outline':
        baseTextStyles.push(styles.outlineText);
        if (disabled) baseTextStyles.push(styles.outlineDisabledText); // ✅ Solo cuando disabled, no loading
        break;
      case 'ghost':
        baseTextStyles.push(styles.ghostText);
        if (disabled) baseTextStyles.push(styles.ghostDisabledText); // ✅ Solo cuando disabled, no loading
        break;
      default:
        baseTextStyles.push(styles.defaultText);
        if (disabled) baseTextStyles.push(styles.defaultDisabledText); // ✅ Solo cuando disabled, no loading
        break;
    }

    return baseTextStyles;
  };

  // Función para obtener el color del spinner según la variante
  const getSpinnerColor = (): string => {
    // Si se proporciona spinnerColor personalizado, usarlo
    if (spinnerColor) {
      return spinnerColor;
    }

    // Color por defecto es blanco
    return '#FFFFFF';
  };

  return (
    <Pressable
      {...pressableProps}
      disabled={isDisabled} // ✅ Funcionalmente deshabilitado cuando disabled O loading
      style={({ pressed }) => [...getButtonStyles(pressed), style]}
    >
      <View style={styles.buttonContent}>
        {loading ? (
          <ActivityIndicator color={getSpinnerColor()} />
        ) : (
          <Text style={[...getTextStyles(), titleStyle]}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Estilos base
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

  // Tamaños
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

  // Tamaños de texto
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

  // Variante Default
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

  // Variante Outline
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

  // Variante Ghost
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

  // Estados globales
  disabledText: {
    // Aplicado a todos los tipos cuando están deshabilitados
  },
});

export default Button;
