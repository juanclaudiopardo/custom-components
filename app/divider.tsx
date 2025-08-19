import { Divider } from '@/components/divider';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DividerDemo() {
  return (
    <SafeAreaView
      style={{ flex: 1, padding: 16, backgroundColor: '#FFFFFF' }}
      edges={['bottom']}
    >
      <ScrollView>
        <Text style={styles.sectionTitle}>Horizontal Dividers</Text>

        <Text style={styles.label}>Default Divider</Text>
        <Divider />

        <Text style={styles.label}>Blue Divider with spacing</Text>
        <Divider color='#007AFF' spacing={20} />

        <Text style={styles.label}>Thick Divider</Text>
        <Divider color='#FF6B6B' width={3} />

        <Text style={styles.label}>50 %</Text>
        <Divider color='#45B7D1' style={{ width: '50%' }} />

        <Text style={styles.sectionTitle}>Vertical Dividers</Text>

        <View style={styles.verticalContainer}>
          <Text>Left</Text>
          <Divider orientation='vertical' color='#FF6B6B' spacing={10} />
          <Text>Middle</Text>
          <Divider orientation='vertical' color='#4ECDC4' width={2} spacing={10} />
          <Text>Right</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    color: '#666',
  },
  verticalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginVertical: 16,
  },
});
