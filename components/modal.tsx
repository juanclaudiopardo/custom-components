import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
  Modal as RNModal,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const COLORS = {
  backdrop: 'rgba(0, 0, 0, 0.5)',
  white: '#FFFFFF',
  gray: '#F8F9FA',
  border: '#E9ECEF',
  text: '#212529',
  textSecondary: '#6C757D',
} as const;

export type ModalSize = 'small' | 'medium' | 'large';
export type ModalAnimation = 'slide' | 'fade' | 'scale';

interface ModalContextType {
  isVisible: boolean;
  onClose: () => void;
  size: ModalSize;
  animation: ModalAnimation;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within a Modal');
  }
  return context;
};

interface BaseModalProps {
  isVisible: boolean;
  onClose: () => void;
  size?: ModalSize;
  animation?: ModalAnimation;
  enableBackdropDismiss?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

const Modal: React.FC<BaseModalProps> & {
  Header: React.FC<ModalHeaderProps>;
  Footer: React.FC<ModalFooterProps>;
} = ({
  isVisible,
  onClose,
  size = 'medium',
  animation = 'slide',
  enableBackdropDismiss = true,
  children,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const scale = useSharedValue(0.3);

  const hideModal = useCallback(() => {
    setModalVisible(false);
    // Reset animated values for next time
    translateY.value = SCREEN_HEIGHT;
    scale.value = 0.3;
    opacity.value = 0;
  }, [translateY, scale, opacity]);

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      opacity.value = withTiming(1, { duration: 300 });
      
      switch (animation) {
        case 'slide':
          translateY.value = withTiming(0, {
            duration: 300,
          });
          break;
        case 'scale':
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 300,
          });
          break;
        case 'fade':
          break;
      }
    } else if (!isVisible && modalVisible) {
      switch (animation) {
        case 'slide':
          translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 }, (finished) => {
            if (finished) {
              runOnJS(hideModal)();
            }
          });
          opacity.value = withTiming(0, { duration: 300 });
          break;
        case 'scale':
          scale.value = withTiming(0.3, { duration: 250 }, (finished) => {
            if (finished) {
              runOnJS(hideModal)();
            }
          });
          opacity.value = withTiming(0, { duration: 250 });
          break;
        case 'fade':
          opacity.value = withTiming(0, { duration: 250 }, (finished) => {
            if (finished) {
              runOnJS(hideModal)();
            }
          });
          break;
        default:
          opacity.value = withTiming(0, { duration: 250 }, (finished) => {
            if (finished) {
              runOnJS(hideModal)();
            }
          });
          break;
      }
    }
  }, [isVisible, modalVisible, animation, opacity, translateY, scale, hideModal]);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => {
    const baseStyle: any = {
      opacity: opacity.value,
    };

    switch (animation) {
      case 'slide':
        baseStyle.transform = [{ translateY: translateY.value }];
        break;
      case 'scale':
        baseStyle.transform = [{ scale: scale.value }];
        break;
      case 'fade':
        break;
    }

    return baseStyle;
  });

  const handleBackdropPress = useCallback(() => {
    if (enableBackdropDismiss) {
      onClose();
    }
  }, [enableBackdropDismiss, onClose]);

  const getModalSize = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          width: Math.min(400, SCREEN_WIDTH * 0.9),
          maxHeight: SCREEN_HEIGHT * 0.4,
        };
      case 'medium':
        return {
          width: Math.min(500, SCREEN_WIDTH * 0.9),
          maxHeight: SCREEN_HEIGHT * 0.6,
        };
      case 'large':
        return {
          width: Math.min(700, SCREEN_WIDTH * 0.95),
          maxHeight: SCREEN_HEIGHT * 0.8,
        };
      default:
        return {
          width: Math.min(500, SCREEN_WIDTH * 0.9),
          maxHeight: SCREEN_HEIGHT * 0.6,
        };
    }
  };

  return (
    <RNModal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
        <Pressable style={styles.backdropTouchable} onPress={handleBackdropPress}>
          <View style={styles.backdropOverlay} />
        </Pressable>
        
        <Animated.View
          style={[
            styles.modalContainer,
            getModalSize(),
            modalAnimatedStyle,
            style,
          ]}
        >
          <ModalContext.Provider value={{ isVisible: modalVisible, onClose, size, animation }}>
            {children}
          </ModalContext.Provider>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
};

interface ModalHeaderProps {
  title?: string;
  showCloseButton?: boolean;
  closeButtonAccessibilityLabel?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  showCloseButton = true,
  closeButtonAccessibilityLabel = 'Close modal',
  children,
  style,
  titleStyle,
}) => {
  const { onClose } = useModalContext();

  return (
    <View style={[styles.header, style]}>
      <View style={styles.headerContent}>
        {children || (
          <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
        )}
      </View>
      
      {showCloseButton && (
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [
            styles.closeButton,
            pressed && styles.closeButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={closeButtonAccessibilityLabel}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </Pressable>
      )}
    </View>
  );
};

interface ModalFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  style,
  justifyContent = 'flex-end',
}) => {
  return (
    <View style={[styles.footer, { justifyContent }, style]}>
      {children}
    </View>
  );
};

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backdropTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdropOverlay: {
    flex: 1,
    backgroundColor: COLORS.backdrop,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    minHeight: 60,
  },
  headerContent: {
    flex: 1,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 24,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonPressed: {
    backgroundColor: COLORS.border,
    transform: [{ scale: 0.95 }],
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 12,
    minHeight: 72,
  },
});

export type { BaseModalProps, ModalHeaderProps, ModalFooterProps };
export default Modal;