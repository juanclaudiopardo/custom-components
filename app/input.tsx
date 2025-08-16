// app/input.tsx
import Input from '@/components/input';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InputPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const showIconAlert = (iconType: string) => {
    Alert.alert('Icon Pressed', `${iconType} icon was pressed with haptic feedback!`);
  };

  const clearSearch = () => {
    setSearch('');
    showIconAlert('Clear');
  };

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 16, backgroundColor: '#FFFFFF' }}
      edges={['bottom']}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={{ marginBottom: 16, textAlign: 'center' }}>
          Basic Input
        </Text>
        <View style={{ gap: 16 }}>
          <Input placeholder='Placeholder' />
          <Input placeholder='With label' label='Name' />
        </View>

        <Text style={{ marginVertical: 16, textAlign: 'center' }}>
          Inputs with icons
        </Text>
        <View style={{ gap: 16 }}>
          <Input
            placeholder='Search...'
            value={search}
            onChangeText={setSearch}
            leftIcon={<Ionicons name='search' size={20} color='#9CA3AF' />}
            rightIcon={search ? <Ionicons name='close' size={20} color='#9CA3AF' /> : undefined}
            onRightIconPress={search ? clearSearch : undefined}
            enableHaptics
            accessibilityLabel='Search input field'
            accessibilityHint='Enter text to search, tap X to clear'
          />

          <Input
            label='Email'
            labelStyle={{ color: 'green' }}
            placeholder='Ingresa tu email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            leftIcon={<Ionicons name='mail' size={20} color='#9CA3AF' />}
            enableHaptics
            accessibilityLabel='Email input field'
            accessibilityHint='Enter your email address'
          />

          <Input
            label='Contraseña'
            placeholder='Ingresa tu contraseña'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color='#9CA3AF'
              />
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
            enableHaptics
            accessibilityLabel='Password input field'
            accessibilityHint={`Password is currently ${showPassword ? 'visible' : 'hidden'}, tap eye to toggle`}
          />
        </View>

        <Text style={{ marginVertical: 16, textAlign: 'center' }}>States</Text>
        <View style={{ gap: 16 }}>
          <Input
            placeholder='Disabled input'
            label='Disabled'
            editable={false}
            accessibilityHint='This input field is disabled'
          />
          <Input
            placeholder='With error'
            label='Input with Error'
            error='This field is required'
            rightIcon={
              <Ionicons name='alert-circle' size={20} color='#EF4444' />
            }
            onRightIconPress={() => showIconAlert('Error')}
            enableHaptics
            accessibilityLabel='Input with error state'
            accessibilityHint='This field has a validation error'
          />
          <Text style={{ marginVertical: 16, textAlign: 'center' }}>
            TextArea
          </Text>
          <Input
            label='Comments'
            placeholder='Write your comments...'
            multiline
            numberOfLines={4}
            inputStyle={{ height: 100, textAlignVertical: 'top' }}
            accessibilityLabel='Comments text area'
            accessibilityHint='Multi-line text input for comments'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
