import Toast from '@/components/toast';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ToastScreen() {
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const handleSuccessToast = () => {
    setSuccessVisible(true);
  };

  const handleErrorToast = () => {
    setErrorVisible(true);
  };

  const handleInfoToast = () => {
    setInfoVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Toast Component Demo</Text>
          <Text style={styles.subtitle}>
            Tap the buttons below to see different toast notifications
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Toast Types</Text>

            <TouchableOpacity
              style={[styles.button, styles.successButton]}
              onPress={handleSuccessToast}
              activeOpacity={0.8}
            >
              <MaterialIcons name='check-circle' size={24} color='#FFFFFF' />
              <Text style={styles.buttonText}>Show Success Toast</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.errorButton]}
              onPress={handleErrorToast}
              activeOpacity={0.8}
            >
              <MaterialIcons name='error' size={24} color='#FFFFFF' />
              <Text style={styles.buttonText}>Show Error Toast</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.infoButton]}
              onPress={handleInfoToast}
              activeOpacity={0.8}
            >
              <MaterialIcons name='info' size={24} color='#FFFFFF' />
              <Text style={styles.buttonText}>Show Info Toast</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <MaterialIcons name='animation' size={20} color='#6B7280' />
                <Text style={styles.featureText}>
                  Smooth animations with Reanimated
                </Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name='palette' size={20} color='#6B7280' />
                <Text style={styles.featureText}>
                  Three variants: Success, Error, Info
                </Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name='timer' size={20} color='#6B7280' />
                <Text style={styles.featureText}>
                  Auto-dismiss with customizable duration
                </Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name='touch-app' size={20} color='#6B7280' />
                <Text style={styles.featureText}>Tap to dismiss</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Toast
        type='success'
        title='Success!'
        message='Your operation completed successfully.'
        visible={successVisible}
        onHide={() => setSuccessVisible(false)}
        duration={3000}
        position='bottom'
      />

      <Toast
        type='error'
        title='Error occurred'
        message='Something went wrong. Please try again.'
        visible={errorVisible}
        onHide={() => setErrorVisible(false)}
        duration={3000}
        position='bottom'
      />

      <Toast
        type='info'
        title='Information'
        message='This is an informational message for you.'
        visible={infoVisible}
        onHide={() => setInfoVisible(false)}
        duration={3000}
        position='bottom'
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  successButton: {
    backgroundColor: '#10B981',
  },
  errorButton: {
    backgroundColor: '#EF4444',
  },
  infoButton: {
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  featureList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 12,
    flex: 1,
  },
});
