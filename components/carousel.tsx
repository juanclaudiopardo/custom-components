import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  View,
  ViewStyle,
  Dimensions,
  ViewProps,
  AccessibilityState,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import { Image, ImageSource, ImageCachePolicy } from 'expo-image';
import * as Haptics from 'expo-haptics';

/**
 * Color palette for carousel components
 * @internal
 */
const COLORS = {
  indicator: '#007AFF',
  inactiveIndicator: '#C7C7CC',
  overlay: 'rgba(0, 0, 0, 0.3)',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

/**
 * Screen dimensions for responsive layout
 * @internal
 */
const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Available carousel height variants
 * @public
 */
export type CarouselHeight = 'small' | 'medium' | 'large' | 'auto';

/**
 * Available indicator positions
 * @public
 */
export type IndicatorPosition = 'bottom' | 'top' | 'overlay';

/**
 * Image data structure for carousel items
 * @public
 */
export interface CarouselImageData {
  /**
   * Image source - can be URL string, require(), or ImageSource object
   * @example "https://example.com/image.jpg"
   * @example require('./assets/image.png')
   */
  source: ImageSource | string;
  
  /**
   * Alt text for accessibility
   * @accessibility
   */
  alt?: string;
  
  /**
   * Optional identifier for tracking
   */
  id?: string | number;
  
  /**
   * Optional placeholder image (blurhash, thumbhash, or low-res image)
   * @example "LGFFaXYk^6#M@-5c,1J5@[or[Q6."
   */
  placeholder?: ImageSource | string;
  
  /**
   * Optional priority for loading order
   * @default 'normal'
   */
  priority?: 'low' | 'normal' | 'high';
}

/**
 * Base properties for the Carousel component
 * @interface BaseCarouselProps
 */
interface BaseCarouselProps {
  /**
   * Array of images to display in the carousel
   * @required
   * @example 
   * ```tsx
   * const images = [
   *   { source: 'https://example.com/1.jpg', alt: 'First image' },
   *   { source: require('./image2.png'), alt: 'Second image' },
   * ];
   * ```
   */
  data: CarouselImageData[];

  /**
   * Height variant of the carousel
   * @default 'medium'
   * 
   * - `small`: 150px height
   * - `medium`: 250px height  
   * - `large`: 350px height
   * - `auto`: Height adapts to content
   */
  height?: CarouselHeight;

  /**
   * Position of the page indicators
   * @default 'bottom'
   * 
   * - `bottom`: Below the carousel
   * - `top`: Above the carousel
   * - `overlay`: Overlaid on carousel bottom
   */
  indicatorPosition?: IndicatorPosition;

  /**
   * Show page indicators
   * @default true
   */
  showIndicators?: boolean;

  /**
   * Enable auto-scroll functionality
   * @default false
   */
  autoScroll?: boolean;

  /**
   * Auto-scroll interval in milliseconds
   * @default 3000
   * Only applies when autoScroll is true
   */
  autoScrollInterval?: number;

  /**
   * Enable pagination (snap to images)
   * @default true
   */
  pagingEnabled?: boolean;

  /**
   * Show horizontal scroll indicators
   * @default false
   */
  showsHorizontalScrollIndicator?: boolean;

  /**
   * Border radius for the carousel container
   * @default 12
   */
  borderRadius?: number;

  /**
   * Enable haptic feedback on scroll (mobile only)
   * @default false
   * @platform iOS, Android
   */
  enableHaptics?: boolean;

  /**
   * Callback when active image changes
   * @param index - The index of the current active image
   * @param item - The current active image data
   */
  onImageChange?: (index: number, item: CarouselImageData) => void;

  /**
   * Callback when image is pressed
   * @param index - The index of the pressed image
   * @param item - The pressed image data
   */
  onImagePress?: (index: number, item: CarouselImageData) => void;

  /**
   * Custom image content fit mode
   * @default 'cover'
   */
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  /**
   * Image caching strategy for performance optimization
   * @default 'memory-disk'
   * 
   * - `disk`: Cache images to disk only
   * - `memory`: Cache images in memory only  
   * - `memory-disk`: Cache in both memory and disk (recommended)
   * - `none`: No caching
   */
  cachePolicy?: ImageCachePolicy;

  /**
   * Enable image preloading for adjacent images
   * @default true
   * 
   * Preloads previous and next images for smoother transitions
   */
  enablePreloading?: boolean;

  /**
   * Enable downscaling to reduce memory usage
   * @default true
   * 
   * Automatically scales down images to fit container size
   */
  allowDownscaling?: boolean;

  /**
   * Transition duration for image loading animation
   * @default 200
   * 
   * Duration in milliseconds for fade-in effect
   */
  transitionDuration?: number;

  /**
   * Custom label for screen readers
   * @default "Image carousel with {count} images"
   * @accessibility
   */
  accessibilityLabel?: string;

  /**
   * Hint text for screen readers
   * @accessibility
   * @default "Swipe left or right to navigate between images"
   */
  accessibilityHint?: string;
}

/**
 * Carousel component props extending React Native's ViewProps
 * @public
 */
export type CarouselProps = BaseCarouselProps &
  Omit<ViewProps, 'style'> & {
    /**
     * Custom styles for the carousel container
     * Applied after all variant styles
     */
    style?: ViewStyle;
  };

/**
 * A professional, accessible, and performant image carousel component for React Native.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * const images = [
 *   { source: 'https://picsum.photos/400/300?random=1', alt: 'Random image 1' },
 *   { source: 'https://picsum.photos/400/300?random=2', alt: 'Random image 2' },
 * ];
 * 
 * <Carousel data={images} />
 * 
 * // With custom configuration
 * <Carousel
 *   data={images}
 *   height="large"
 *   autoScroll
 *   autoScrollInterval={5000}
 *   indicatorPosition="overlay"
 *   enableHaptics
 *   onImageChange={(index, item) => console.log('Active:', index)}
 *   onImagePress={(index, item) => console.log('Pressed:', index)}
 * />
 * 
 * // With local images
 * const localImages = [
 *   { source: require('./assets/image1.png'), alt: 'Local image 1' },
 *   { source: require('./assets/image2.png'), alt: 'Local image 2' },
 * ];
 * 
 * <Carousel data={localImages} height="small" />
 * ```
 * 
 * @remarks
 * - Component is memoized for performance
 * - Supports both remote URLs and local images
 * - Fully accessible with screen reader support
 * - Optional auto-scroll with customizable interval
 * - Optional haptic feedback on mobile devices
 * - Responsive design adapts to screen width
 * 
 * @since 1.0.0
 */
const Carousel: React.FC<CarouselProps> = React.memo(({
  data,
  height = 'medium',
  indicatorPosition = 'bottom',
  showIndicators = true,
  autoScroll = false,
  autoScrollInterval = 3000,
  pagingEnabled = true,
  showsHorizontalScrollIndicator = false,
  borderRadius = 12,
  enableHaptics = false,
  onImageChange,
  onImagePress,
  contentFit = 'cover',
  cachePolicy = 'memory-disk',
  enablePreloading = true,
  allowDownscaling = true,
  transitionDuration = 200,
  accessibilityLabel,
  accessibilityHint,
  style,
  ...viewProps
}) => {
  /**
   * Current active image index
   */
  const [currentIndex, setCurrentIndex] = useState(0);
  
  /**
   * ScrollView reference for programmatic control
   */
  const scrollViewRef = useRef<ScrollView>(null);
  
  /**
   * Auto-scroll timer reference
   */
  const autoScrollTimer = useRef<number | null>(null);

  /**
   * Accessibility state object for screen readers
   */
  const accessibilityState: AccessibilityState = useMemo(() => ({
    disabled: false,
  }), []);

  /**
   * Calculate carousel height based on variant
   * @memoized Recalculates only when height prop changes
   */
  const carouselHeight = useMemo((): number | undefined => {
    switch (height) {
      case 'small':
        return 150;
      case 'medium':
        return 250;
      case 'large':
        return 350;
      case 'auto':
        return undefined;
      default:
        return 250;
    }
  }, [height]);

  /**
   * Generate container styles based on height and border radius
   * @memoized Recalculates only when dependencies change
   */
  const containerStyles = useMemo((): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.container];
    
    if (carouselHeight) {
      baseStyles.push({ height: carouselHeight });
    }
    
    if (borderRadius) {
      baseStyles.push({ borderRadius });
    }

    return baseStyles;
  }, [carouselHeight, borderRadius]);

  /**
   * Generate indicator container styles based on position
   * @memoized Recalculates only when indicatorPosition changes
   */
  const indicatorContainerStyles = useMemo((): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.indicatorContainer];
    
    switch (indicatorPosition) {
      case 'top':
        baseStyles.push(styles.indicatorTop);
        break;
      case 'overlay':
        baseStyles.push(styles.indicatorOverlay);
        break;
      default:
        baseStyles.push(styles.indicatorBottom);
        break;
    }

    return baseStyles;
  }, [indicatorPosition]);

  /**
   * Clear auto-scroll timer
   */
  const clearAutoScrollTimer = useCallback(() => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  }, []);

  /**
   * Start auto-scroll timer
   */
  const startAutoScroll = useCallback(() => {
    if (!autoScroll || data.length <= 1) return;
    
    clearAutoScrollTimer();
    autoScrollTimer.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * SCREEN_WIDTH,
          animated: true,
        });
        return nextIndex;
      });
    }, autoScrollInterval);
  }, [autoScroll, autoScrollInterval, data.length, clearAutoScrollTimer]);

  /**
   * Handle scroll end event to update current index
   */
  const handleScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / SCREEN_WIDTH);
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < data.length) {
      setCurrentIndex(newIndex);
      onImageChange?.(newIndex, data[newIndex]);
      
      // Trigger haptic feedback if enabled
      if (enableHaptics && Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  }, [currentIndex, data, onImageChange, enableHaptics]);

  /**
   * Handle image press
   */
  const handleImagePress = useCallback((index: number) => {
    onImagePress?.(index, data[index]);
  }, [onImagePress, data]);

  /**
   * Auto-scroll effect
   */
  useEffect(() => {
    if (autoScroll) {
      startAutoScroll();
    }
    return clearAutoScrollTimer;
  }, [autoScroll, startAutoScroll, clearAutoScrollTimer]);

  /**
   * Generate accessibility label
   */
  const carouselAccessibilityLabel = useMemo(() => {
    return accessibilityLabel || `Image carousel with ${data.length} images`;
  }, [accessibilityLabel, data.length]);

  /**
   * Generate accessibility hint
   */
  const carouselAccessibilityHint = useMemo(() => {
    return accessibilityHint || 'Swipe left or right to navigate between images';
  }, [accessibilityHint]);

  /**
   * Preload adjacent images for smoother transitions
   */
  useEffect(() => {
    if (!enablePreloading || data.length <= 1) return;

    const preloadImage = async (index: number) => {
      if (index >= 0 && index < data.length) {
        const item = data[index];
        try {
          await Image.prefetch(item.source);
        } catch (error) {
          // Silently fail preloading to not affect user experience
          console.warn(`Failed to preload image at index ${index}:`, error);
        }
      }
    };

    // Preload previous and next images
    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;
    
    preloadImage(prevIndex);
    preloadImage(nextIndex);

    // For auto-scroll, also preload the image after next
    if (autoScroll) {
      const nextNextIndex = (currentIndex + 2) % data.length;
      preloadImage(nextNextIndex);
    }
  }, [currentIndex, data, enablePreloading, autoScroll]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View
      {...viewProps}
      style={[...containerStyles, style]}
      accessibilityLabel={carouselAccessibilityLabel}
      accessibilityHint={carouselAccessibilityHint}
      accessibilityState={accessibilityState}
    >
      {/* Top indicators */}
      {showIndicators && indicatorPosition === 'top' && (
        <View style={indicatorContainerStyles}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex ? styles.activeIndicator : styles.inactiveIndicator,
              ]}
            />
          ))}
        </View>
      )}

      {/* Carousel ScrollView */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled={pagingEnabled}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollBeginDrag={clearAutoScrollTimer}
          onScrollEndDrag={startAutoScroll}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          decelerationRate="fast"
          bounces={false}
          snapToInterval={SCREEN_WIDTH}
          snapToAlignment="start"
        >
          {data.map((item, index) => (
            <View key={item.id || index} style={styles.imageContainer}>
              <Image
                source={item.source}
                style={styles.image}
                contentFit={contentFit}
                placeholder={item.placeholder}
                placeholderContentFit={contentFit}
                transition={transitionDuration}
                cachePolicy={cachePolicy}
                priority={item.priority || (index === currentIndex ? 'high' : 'normal')}
                allowDownscaling={allowDownscaling}
                accessibilityLabel={item.alt || `Image ${index + 1}`}
                onTouchEnd={() => handleImagePress(index)}
                recyclingKey={`carousel-image-${index}`}
              />
            </View>
          ))}
        </ScrollView>

        {/* Overlay indicators */}
        {showIndicators && indicatorPosition === 'overlay' && (
          <View style={indicatorContainerStyles}>
            {data.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex ? styles.activeIndicator : styles.inactiveIndicator,
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Bottom indicators */}
      {showIndicators && indicatorPosition === 'bottom' && (
        <View style={indicatorContainerStyles}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex ? styles.activeIndicator : styles.inactiveIndicator,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
});

/**
 * Display name for React DevTools
 */
Carousel.displayName = 'Carousel';

/**
 * StyleSheet containing all carousel style variations
 * @internal
 */
const styles = StyleSheet.create({
  // Base styles
  container: {
    backgroundColor: COLORS.transparent,
    overflow: 'hidden',
  },
  carouselContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // Indicator styles
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  indicatorTop: {
    paddingBottom: 12,
    paddingTop: 0,
  },
  indicatorBottom: {
    paddingTop: 12,
    paddingBottom: 0,
  },
  indicatorOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    backgroundColor: COLORS.overlay,
    borderRadius: 16,
    marginHorizontal: 20,
    paddingVertical: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.indicator,
  },
  inactiveIndicator: {
    backgroundColor: COLORS.inactiveIndicator,
  },
});

/**
 * Export the Carousel component as default
 * 
 * @example
 * import Carousel from '@/components/carousel';
 * 
 * @example 
 * import { CarouselHeight, IndicatorPosition, CarouselImageData } from '@/components/carousel';
 */
export default Carousel;