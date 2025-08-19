import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Modal from '@/components/modal';
import Button from '@/components/button';

export default function ModalScreen() {
  const [basicModal, setBasicModal] = useState(false);
  const [sizeModal, setSizeModal] = useState<{
    visible: boolean;
    size: 'small' | 'medium' | 'large';
  }>({ visible: false, size: 'medium' });
  const [animationModal, setAnimationModal] = useState<{
    visible: boolean;
    animation: 'slide' | 'fade' | 'scale';
  }>({ visible: false, animation: 'slide' });
  const [customModal, setCustomModal] = useState(false);
  const [formModal, setFormModal] = useState(false);

  const handleConfirm = () => {
    Alert.alert('Confirmed', 'Action was confirmed!');
    setBasicModal(false);
  };

  const handleSave = () => {
    Alert.alert('Saved', 'Form data saved successfully!');
    setFormModal(false);
  };

  const openSizeModal = (size: 'small' | 'medium' | 'large') => {
    setSizeModal({ visible: true, size });
  };

  const openAnimationModal = (animation: 'slide' | 'fade' | 'scale') => {
    setAnimationModal({ visible: true, animation });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />
      
      <Text style={styles.title}>Modal Component</Text>
      <Text style={styles.description}>
        A flexible modal component with compound pattern, animations, and customization options.
      </Text>

      {/* Basic Modal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Modal</Text>
        <Button
          title="Open Basic Modal"
          onPress={() => setBasicModal(true)}
        />
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Small"
            size="small"
            variant="outline"
            onPress={() => openSizeModal('small')}
            style={styles.sizeButton}
          />
          <Button
            title="Medium"
            size="small"
            variant="outline"
            onPress={() => openSizeModal('medium')}
            style={styles.sizeButton}
          />
          <Button
            title="Large"
            size="small"
            variant="outline"
            onPress={() => openSizeModal('large')}
            style={styles.sizeButton}
          />
        </View>
      </View>

      {/* Animation Types */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Types</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Slide"
            size="small"
            variant="ghost"
            onPress={() => openAnimationModal('slide')}
            style={styles.animationButton}
          />
          <Button
            title="Fade"
            size="small"
            variant="ghost"
            onPress={() => openAnimationModal('fade')}
            style={styles.animationButton}
          />
          <Button
            title="Scale"
            size="small"
            variant="ghost"
            onPress={() => openAnimationModal('scale')}
            style={styles.animationButton}
          />
        </View>
      </View>

      {/* Custom Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Content</Text>
        <Button
          title="Open Custom Modal"
          variant="outline"
          onPress={() => setCustomModal(true)}
        />
      </View>

      {/* Form Modal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Form Modal</Text>
        <Button
          title="Open Form Modal"
          onPress={() => setFormModal(true)}
        />
      </View>

      {/* Basic Modal */}
      <Modal
        isVisible={basicModal}
        onClose={() => setBasicModal(false)}
        size="medium"
        animation="slide"
      >
        <Modal.Header title="Confirm Action" />
        
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to perform this action? This cannot be undone.
          </Text>
        </View>

        <Modal.Footer justifyContent="flex-end">
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => setBasicModal(false)}
            style={styles.footerButton}
          />
          <Button
            title="Confirm"
            onPress={handleConfirm}
            style={styles.footerButton}
          />
        </Modal.Footer>
      </Modal>

      {/* Size Modal */}
      <Modal
        isVisible={sizeModal.visible}
        onClose={() => setSizeModal({ ...sizeModal, visible: false })}
        size={sizeModal.size}
        animation="slide"
      >
        <Modal.Header title={`${sizeModal.size.charAt(0).toUpperCase() + sizeModal.size.slice(1)} Modal`} />
        
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            This is a {sizeModal.size} sized modal. The content area adjusts based on the selected size.
          </Text>
          {sizeModal.size === 'large' && (
            <Text style={styles.modalSubtext}>
              Large modals are great for detailed forms, complex content, or when you need more space for user interaction.
            </Text>
          )}
        </View>

        <Modal.Footer>
          <Button
            title="Close"
            variant="outline"
            onPress={() => setSizeModal({ ...sizeModal, visible: false })}
          />
        </Modal.Footer>
      </Modal>

      {/* Animation Modal */}
      <Modal
        isVisible={animationModal.visible}
        onClose={() => setAnimationModal({ ...animationModal, visible: false })}
        size="medium"
        animation={animationModal.animation}
      >
        <Modal.Header title={`${animationModal.animation.charAt(0).toUpperCase() + animationModal.animation.slice(1)} Animation`} />
        
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            This modal uses the {animationModal.animation} animation type.
          </Text>
        </View>

        <Modal.Footer>
          <Button
            title="Close"
            onPress={() => setAnimationModal({ ...animationModal, visible: false })}
          />
        </Modal.Footer>
      </Modal>

      {/* Custom Modal */}
      <Modal
        isVisible={customModal}
        onClose={() => setCustomModal(false)}
        size="medium"
        animation="scale"
      >
        <Modal.Header showCloseButton={false}>
          <View style={styles.customHeader}>
            <Text style={styles.customHeaderTitle}>🎉 Custom Header</Text>
            <Text style={styles.customHeaderSubtitle}>With custom styling</Text>
          </View>
        </Modal.Header>
        
        <View style={[styles.modalContent, styles.customContent]}>
          <Text style={styles.modalText}>
            This modal demonstrates custom content with custom header styling and scale animation.
          </Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Custom header with emoji</Text>
            <Text style={styles.featureItem}>• Scale animation</Text>
            <Text style={styles.featureItem}>• Custom styling</Text>
            <Text style={styles.featureItem}>• Compound component pattern</Text>
          </View>
        </View>

        <Modal.Footer justifyContent="center">
          <Button
            title="Got it!"
            onPress={() => setCustomModal(false)}
            style={{ minWidth: 120 }}
          />
        </Modal.Footer>
      </Modal>

      {/* Form Modal */}
      <Modal
        isVisible={formModal}
        onClose={() => setFormModal(false)}
        size="large"
        animation="slide"
        enableBackdropDismiss={false}
      >
        <Modal.Header title="User Information Form" />
        
        <ScrollView style={styles.formContent}>
          <Text style={styles.formLabel}>Name</Text>
          <View style={styles.inputPlaceholder}>
            <Text style={styles.placeholderText}>John Doe</Text>
          </View>
          
          <Text style={styles.formLabel}>Email</Text>
          <View style={styles.inputPlaceholder}>
            <Text style={styles.placeholderText}>john@example.com</Text>
          </View>
          
          <Text style={styles.formLabel}>Message</Text>
          <View style={[styles.inputPlaceholder, styles.textAreaPlaceholder]}>
            <Text style={styles.placeholderText}>Your message here...</Text>
          </View>
          
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox} />
            <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
          </View>
        </ScrollView>

        <Modal.Footer justifyContent="space-between">
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => setFormModal(false)}
            style={styles.footerButton}
          />
          <Button
            title="Save"
            onPress={handleSave}
            style={styles.footerButton}
          />
        </Modal.Footer>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeButton: {
    flex: 1,
    minWidth: 70,
  },
  animationButton: {
    flex: 1,
    minWidth: 80,
  },
  modalContent: {
    padding: 20,
    minHeight: 100,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 8,
  },
  modalSubtext: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 12,
  },
  footerButton: {
    minWidth: 100,
  },
  customHeader: {
    alignItems: 'flex-start',
  },
  customHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  customHeaderSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  customContent: {
    backgroundColor: '#f8f9fa',
  },
  featureList: {
    marginTop: 16,
    paddingLeft: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  formContent: {
    maxHeight: 400,
    paddingHorizontal: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  inputPlaceholder: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
  },
  textAreaPlaceholder: {
    minHeight: 80,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: '#007AFF',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});