import React, { useMemo } from 'react';
import {
  Text,
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';

const COLORS = {
  default: {
    background: '#6B7280',
    text: '#FFFFFF',
  },
  success: {
    background: '#10B981',
    text: '#FFFFFF',
  },
  warning: {
    background: '#F59E0B',
    text: '#FFFFFF',
  },
  error: {
    background: '#EF4444',
    text: '#FFFFFF',
  },
  info: {
    background: '#3B82F6',
    text: '#FFFFFF',
  },
} as const;

export type BadgeVariant = 'dot' | 'count' | 'text';

export type BadgeSize = 'small' | 'medium' | 'large';

export type BadgeColor = 'default' | 'success' | 'warning' | 'error' | 'info';

export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface BaseBadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  content?: string | number;
  position?: BadgePosition;
  maxCount?: number;
  show?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export type BadgeProps = BaseBadgeProps;

const Badge: React.FC<BadgeProps> = React.memo(({
  variant = 'count',
  size = 'medium',
  color = 'default',
  content = '',
  position = 'top-right',
  maxCount = 99,
  show = true,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const displayContent = useMemo(() => {
    if (variant === 'dot') return '';
    if (variant === 'count' && typeof content === 'number') {
      return content > maxCount ? `${maxCount}+` : content.toString();
    }
    return content?.toString() || '';
  }, [variant, content, maxCount]);

  const badgeStyles = useMemo((): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [
      styles.baseBadge,
      styles[`size_${size}`],
      styles[`variant_${variant}`],
      styles[`position_${position}`],
      {
        backgroundColor: COLORS[color].background,
      },
    ];

    if (variant === 'dot') {
      baseStyles.push(styles.dotVariant);
    }

    return baseStyles;
  }, [size, variant, position, color]);

  const badgeTextStyles = useMemo((): TextStyle[] => {
    const baseTextStyles: TextStyle[] = [
      styles.baseText,
      styles[`text_${size}`],
      {
        color: COLORS[color].text,
      },
    ];

    return baseTextStyles;
  }, [size, color]);

  if (!show) return null;

  return (
    <View
      style={[...badgeStyles, style]}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel || `Badge with ${displayContent}`}
    >
      {variant !== 'dot' && (
        <Text style={[...badgeTextStyles, textStyle]}>
          {displayContent}
        </Text>
      )}
    </View>
  );
});

Badge.displayName = 'Badge';

const styles = StyleSheet.create({
  baseBadge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    zIndex: 1,
  },
  baseText: {
    fontWeight: '600',
    textAlign: 'center',
  },

  // Sizes
  size_small: {
    minWidth: 16,
    minHeight: 16,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  size_medium: {
    minWidth: 20,
    minHeight: 20,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  size_large: {
    minWidth: 24,
    minHeight: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  // Text sizes
  text_small: {
    fontSize: 10,
    lineHeight: 12,
  },
  text_medium: {
    fontSize: 12,
    lineHeight: 14,
  },
  text_large: {
    fontSize: 14,
    lineHeight: 16,
  },

  // Variants
  variant_dot: {},
  variant_count: {},
  variant_text: {},

  // Dot variant specific
  dotVariant: {
    width: 8,
    height: 8,
    minWidth: 8,
    minHeight: 8,
    padding: 0,
  },

  // Positions - Badge anchors at corner and expands outward
  'position_top-right': {
    top: 0,
    right: 0,
    transform: [{ translateX: 8 }, { translateY: -8 }],
  },
  'position_top-left': {
    top: 0,
    left: 0,
    transform: [{ translateX: -8 }, { translateY: -8 }],
  },
  'position_bottom-right': {
    bottom: 0,
    right: 0,
    transform: [{ translateX: 8 }, { translateY: 8 }],
  },
  'position_bottom-left': {
    bottom: 0,
    left: 0,
    transform: [{ translateX: -8 }, { translateY: 8 }],
  },
});

export default Badge;