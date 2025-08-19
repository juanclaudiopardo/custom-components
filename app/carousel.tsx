import Carousel, { CarouselImageData } from '@/components/carousel';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample images using different sources with optimization features
const sampleImages: CarouselImageData[] = [
  {
    id: 1,
    source: 'https://picsum.photos/400/300?random=1',
    alt: 'Beautiful landscape with mountains and lake',
    placeholder: 'https://picsum.photos/50/40?random=1', // Low-res placeholder
    priority: 'high'
  },
  {
    id: 2,
    source: 'https://picsum.photos/400/300?random=2',
    alt: 'City skyline at sunset',
    placeholder: 'https://picsum.photos/50/40?random=2',
    priority: 'normal'
  },
  {
    id: 3,
    source: 'https://picsum.photos/400/300?random=3',
    alt: 'Forest pathway with tall trees',
    placeholder: 'https://picsum.photos/50/40?random=3',
    priority: 'normal'
  },
  {
    id: 4,
    source: 'https://picsum.photos/400/300?random=4',
    alt: 'Ocean waves on a sandy beach',
    placeholder: 'https://picsum.photos/50/40?random=4',
    priority: 'low'
  }
];

const natureImages: CarouselImageData[] = [
  {
    id: 1,
    source: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    alt: 'Mountain landscape',
    placeholder: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=50&h=40&fit=crop&blur=10',
    priority: 'high'
  },
  {
    id: 2,
    source: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    alt: 'Forest trees',
    placeholder: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=50&h=40&fit=crop&blur=10',
    priority: 'normal'
  },
  {
    id: 3,
    source: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    alt: 'Ocean view',
    placeholder: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=50&h=40&fit=crop&blur=10',
    priority: 'normal'
  }
];

export default function CarouselPage() {
  return (
    <SafeAreaView
      style={{ flex: 1, padding: 16, backgroundColor: '#FFFFFF' }}
      edges={['bottom']}
    >
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Image Carousel Component
        </Text>

        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Basic Carousel
        </Text>
        <View style={{ marginBottom: 24 }}>
          <Carousel
            data={sampleImages}
            onImageChange={(index, item) => 
              console.log(`Image changed to index ${index}:`, item.alt)
            }
            onImagePress={(index, item) => 
              console.log(`Image pressed at index ${index}:`, item.alt)
            }
          />
        </View>

        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Optimized Auto-scroll Carousel (Memory caching, preloading)
        </Text>
        <View style={{ marginBottom: 24 }}>
          <Carousel
            data={natureImages}
            autoScroll
            autoScrollInterval={5000}
            enableHaptics
            height="small"
            cachePolicy="memory-disk"
            enablePreloading={true}
            allowDownscaling={true}
            transitionDuration={300}
          />
        </View>

        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Overlay Indicators
        </Text>
        <View style={{ marginBottom: 24 }}>
          <Carousel
            data={sampleImages}
            indicatorPosition="overlay"
            height="medium"
            borderRadius={16}
          />
        </View>

        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Top Indicators & Large Size
        </Text>
        <View style={{ marginBottom: 24 }}>
          <Carousel
            data={natureImages}
            indicatorPosition="top"
            height="large"
            contentFit="contain"
          />
        </View>

        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Small Carousel without Indicators
        </Text>
        <View style={{ marginBottom: 24 }}>
          <Carousel
            data={sampleImages.slice(0, 2)}
            showIndicators={false}
            height="small"
            borderRadius={8}
            showsHorizontalScrollIndicator
          />
        </View>

        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Custom Styling
        </Text>
        <View style={{ marginBottom: 24 }}>
          <Carousel
            data={natureImages}
            style={{
              backgroundColor: '#F5F5F5',
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
            borderRadius={20}
            enableHaptics
            accessibilityLabel="Nature photography carousel"
            accessibilityHint="Swipe to see beautiful nature photos"
          />
        </View>

        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Single Image (No Pagination)
        </Text>
        <View style={{ marginBottom: 24 }}>
          <Carousel
            data={[sampleImages[0]]}
            pagingEnabled={false}
            height="medium"
          />
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
            🚀 <Text style={{ fontWeight: '600' }}>Performance Optimizations:</Text>{'\n'}
            • Advanced image caching (memory + disk){'\n'}
            • Intelligent preloading of adjacent images{'\n'}
            • Automatic image downscaling for memory efficiency{'\n'}
            • Priority-based loading (high/normal/low){'\n'}
            • Placeholder images with blur effects{'\n'}
            • Recycling keys for optimal memory usage{'\n\n'}
            ✨ <Text style={{ fontWeight: '600' }}>Features:</Text>{'\n'}
            • Supports remote URLs and local images{'\n'}
            • Auto-scroll with customizable intervals{'\n'}
            • Multiple indicator positions (top, bottom, overlay){'\n'}
            • Responsive design adapts to screen width{'\n'}
            • Full accessibility support{'\n'}
            • Haptic feedback on mobile devices{'\n'}
            • TypeScript support with comprehensive interfaces
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}