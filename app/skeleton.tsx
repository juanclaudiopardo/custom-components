import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonGroup,
} from '@/components/skeleton';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from 'react-native';

export default function SkeletonScreen() {
  const [showContent, setShowContent] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Skeleton Component</Text>
          <Text style={styles.subtitle}>
            Loading states with shimmer animation
          </Text>
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Show Content</Text>
          <Switch
            value={showContent}
            onValueChange={setShowContent}
            trackColor={{ false: '#E1E9EE', true: '#4CAF50' }}
            thumbColor={showContent ? '#FFFFFF' : '#F4F3F4'}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Shapes</Text>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Rectangle</Text>
            {showContent ? (
              <View style={styles.contentBox}>
                <Text>Content Loaded!</Text>
              </View>
            ) : (
              <Skeleton
                variant='rectangle'
                width='100%'
                height={60}
                borderRadius={8}
              />
            )}
          </View>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Circle</Text>
            <View style={styles.row}>
              {showContent ? (
                <>
                  <View style={styles.avatar} />
                  <View style={styles.avatar} />
                  <View style={styles.avatar} />
                </>
              ) : (
                <>
                  <Skeleton variant='circle' size={60} />
                  <Skeleton variant='circle' size={60} />
                  <Skeleton variant='circle' size={60} />
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Skeleton</Text>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Paragraph</Text>
            {showContent ? (
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </Text>
            ) : (
              <SkeletonText
                lines={4}
                lineHeight={16}
                lineGap={10}
                lastLineWidth='70%'
              />
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Complex Layouts</Text>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>List Item</Text>
            {showContent ? (
              <View style={styles.listItem}>
                <View style={styles.avatar} />
                <View style={styles.listContent}>
                  <Text style={styles.listTitle}>John Doe</Text>
                  <Text style={styles.listSubtitle}>Software Developer</Text>
                  <Text style={styles.listDescription}>
                    Working on exciting projects with React Native
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.listItem}>
                <Skeleton variant='circle' size={60} />
                <View style={styles.listContent}>
                  <Skeleton
                    variant='rectangle'
                    width='60%'
                    height={20}
                    style={{ marginBottom: 8 }}
                  />
                  <Skeleton
                    variant='rectangle'
                    width='40%'
                    height={16}
                    style={{ marginBottom: 8 }}
                  />
                  <SkeletonText lines={2} lineHeight={14} lineGap={6} />
                </View>
              </View>
            )}
          </View>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Card</Text>
            {showContent ? (
              <View style={styles.card}>
                <View style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Amazing Product</Text>
                  <Text style={styles.cardDescription}>
                    This is an amazing product that you&apos;ll love. It has
                    many great features and benefits that will improve your
                    daily life.
                  </Text>
                  <TouchableOpacity style={styles.cardButton}>
                    <Text style={styles.cardButtonText}>Learn More</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <SkeletonCard
                imageHeight={180}
                showImage={true}
                showTitle={true}
                showDescription={true}
                padding={16}
                borderRadius={12}
              />
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Colors</Text>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Dark Theme</Text>
            <SkeletonGroup gap={12}>
              <Skeleton
                variant='rectangle'
                height={50}
                backgroundColor='#2C2C2C'
                highlightColor='#404040'
                animationSpeed={1200}
              />
              <SkeletonText
                lines={2}
                backgroundColor='#2C2C2C'
                highlightColor='#404040'
                animationSpeed={1200}
              />
            </SkeletonGroup>
          </View>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Blue Theme</Text>
            <SkeletonGroup gap={12}>
              <Skeleton
                variant='rectangle'
                height={50}
                backgroundColor='#E3F2FD'
                highlightColor='#BBDEFB'
                animationSpeed={800}
              />
              <SkeletonText
                lines={2}
                backgroundColor='#E3F2FD'
                highlightColor='#BBDEFB'
                animationSpeed={800}
              />
            </SkeletonGroup>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Animation Speeds</Text>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Fast (500ms)</Text>
            <Skeleton variant='rectangle' height={40} animationSpeed={500} />
          </View>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Normal (1000ms)</Text>
            <Skeleton variant='rectangle' height={40} animationSpeed={1000} />
          </View>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Slow (2000ms)</Text>
            <Skeleton variant='rectangle' height={40} animationSpeed={2000} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grid Layout</Text>

          <View style={styles.demoContainer}>
            {showContent ? (
              <View style={styles.grid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <View key={i} style={styles.gridItem}>
                    <View style={styles.gridImage} />
                    <Text style={styles.gridText}>Item {i + 1}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.grid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <View key={i} style={styles.gridItem}>
                    <Skeleton
                      variant='rectangle'
                      width='100%'
                      height={100}
                      borderRadius={8}
                      style={{ marginBottom: 8 }}
                    />
                    <Skeleton variant='rectangle' width='80%' height={16} />
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  demoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  contentBox: {
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    gap: 16,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  listSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  listDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#999',
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#4CAF50',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '48%',
  },
  gridImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
