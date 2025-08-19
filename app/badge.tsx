import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import Badge from '@/components/badge';

const BadgeDemo = () => {
  const [showBadges, setShowBadges] = useState(true);
  const [count, setCount] = useState(5);

  const IconPlaceholder = ({ size = 40, children }: { size?: number; children?: React.ReactNode }) => (
    <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
      <Text style={styles.iconText}>📨</Text>
      {children}
    </View>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Badge Components' }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <Section title="Basic Variants">
          <View style={styles.row}>
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Dot</Text>
              <IconPlaceholder>
                <Badge variant="dot" color="error" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Count</Text>
              <IconPlaceholder>
                <Badge variant="count" content={3} color="error" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Text</Text>
              <IconPlaceholder>
                <Badge variant="text" content="NEW" color="success" />
              </IconPlaceholder>
            </View>
          </View>
        </Section>

        <Section title="Colors">
          <View style={styles.row}>
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Default</Text>
              <IconPlaceholder>
                <Badge content={1} color="default" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Success</Text>
              <IconPlaceholder>
                <Badge content={2} color="success" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Warning</Text>
              <IconPlaceholder>
                <Badge content={3} color="warning" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Error</Text>
              <IconPlaceholder>
                <Badge content={4} color="error" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Info</Text>
              <IconPlaceholder>
                <Badge content={5} color="info" />
              </IconPlaceholder>
            </View>
          </View>
        </Section>

        <Section title="Sizes">
          <View style={styles.row}>
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Small</Text>
              <IconPlaceholder>
                <Badge content={99} size="small" color="error" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Medium</Text>
              <IconPlaceholder>
                <Badge content={99} size="medium" color="error" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Large</Text>
              <IconPlaceholder>
                <Badge content={99} size="large" color="error" />
              </IconPlaceholder>
            </View>
          </View>
        </Section>

        <Section title="Positions">
          <View style={styles.positionGrid}>
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Top Right</Text>
              <IconPlaceholder size={50}>
                <Badge content={1} position="top-right" color="error" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Top Left</Text>
              <IconPlaceholder size={50}>
                <Badge content={2} position="top-left" color="success" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Bottom Right</Text>
              <IconPlaceholder size={50}>
                <Badge content={3} position="bottom-right" color="warning" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Bottom Left</Text>
              <IconPlaceholder size={50}>
                <Badge content={4} position="bottom-left" color="info" />
              </IconPlaceholder>
            </View>
          </View>
        </Section>

        <Section title="Max Count">
          <View style={styles.row}>
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Max 99</Text>
              <IconPlaceholder>
                <Badge content={150} maxCount={99} color="error" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Max 9</Text>
              <IconPlaceholder>
                <Badge content={25} maxCount={9} color="error" />
              </IconPlaceholder>
            </View>
          </View>
        </Section>

        <Section title="Interactive Controls">
          <View style={styles.controlsContainer}>
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={() => setShowBadges(!showBadges)}
            >
              <Text style={styles.controlButtonText}>
                {showBadges ? 'Hide' : 'Show'} Badges
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={() => setCount(count + 1)}
            >
              <Text style={styles.controlButtonText}>
                Increment Count
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={() => setCount(Math.max(0, count - 1))}
            >
              <Text style={styles.controlButtonText}>
                Decrement Count
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Dynamic Count: {count}</Text>
              <IconPlaceholder>
                <Badge content={count} show={showBadges} color="info" />
              </IconPlaceholder>
            </View>
          </View>
        </Section>

        <Section title="Text Examples">
          <View style={styles.row}>
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Status</Text>
              <IconPlaceholder>
                <Badge variant="text" content="HOT" color="error" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Update</Text>
              <IconPlaceholder>
                <Badge variant="text" content="NEW" color="success" />
              </IconPlaceholder>
            </View>
            
            <View style={styles.badgeExample}>
              <Text style={styles.exampleLabel}>Beta</Text>
              <IconPlaceholder>
                <Badge variant="text" content="β" color="warning" />
              </IconPlaceholder>
            </View>
          </View>
        </Section>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1F2937',
  },
  sectionContent: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  positionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  badgeExample: {
    alignItems: 'center',
    gap: 8,
    minWidth: 80,
  },
  exampleLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  iconPlaceholder: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconText: {
    fontSize: 24,
  },
  controlsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  controlButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default BadgeDemo;