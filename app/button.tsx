import Button from '@/components/button';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ButtonPage() {
  return (
    <SafeAreaView
      style={{ flex: 1, padding: 16, backgroundColor: '#FFFFFF' }}
      edges={['bottom']}
    >
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ marginBottom: 8 }}>Buttons Variants</Text>
        <View style={{ gap: 16 }}>
          <Button
            title='Button Default'
            onPress={() => console.log('Button Default pressed')}
          />
          <Button
            title='Button Outline'
            variant='outline'
            onPress={() => console.log('Button Outline pressed')}
          />
          <Button
            title='Button Ghost'
            variant='ghost'
            onPress={() => console.log('Button Ghost pressed')}
          />
        </View>
        <Text style={{ marginVertical: 8 }}>Button Sizes (sm, md, lg)</Text>
        <View style={{ gap: 16 }}>
          <Button
            title='Small'
            size='small'
            onPress={() => console.log('Botón Pequeño presionado')}
          />
          <Button
            title='Medium'
            size='medium'
            onPress={() => console.log('Button Medium pressed')}
          />
          <Button
            title='Large'
            size='large'
            onPress={() => console.log('Button Large pressed')}
          />
        </View>
        <Text style={{ marginVertical: 8 }}>Button States</Text>
        <View style={{ gap: 16 }}>
          <Button
            title='Disabled'
            disabled
            onPress={() => console.log('Button Disabled pressed')}
          />
          <Button
            title='Loading'
            loading
            onPress={() => console.log('Button Loading pressed')}
          />
          <Button
            title='Loading'
            variant='outline'
            loading
            spinnerColor='blue'
            onPress={() => console.log('Button Loading pressed')}
          />
          <Button
            title='Loading'
            variant='ghost'
            loading
            spinnerColor='blue'
            onPress={() => console.log('Button Loading pressed')}
          />
        </View>
        <Text style={{ marginVertical: 8 }}>Buttons with icons</Text>
        <View style={{ gap: 16 }}>
          <Button
            title='Edit'
            variant='outline'
            leftIcon={<Ionicons name='pencil' size={18} color='#007AFF' />}
            onPress={() => console.log('Edit button pressed')}
          />

          <Button
            title='Download'
            rightIcon={<Ionicons name='share' size={20} color='#FFFFFF' />}
            onPress={() => console.log('Download button pressed')}
          />

          <Button
            title='Process'
            variant='ghost'
            leftIcon={<Ionicons name='cog' size={20} color='blue' />}
            onPress={() => console.log('Process button pressed')}
          />
        </View>
        <Text style={{ marginVertical: 8 }}>
          Buttons with flex direction row
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            marginTop: 16,
          }}
        >
          <Button
            title='Edit'
            variant='outline'
            leftIcon={<Ionicons name='pencil' size={18} color='#007AFF' />}
            onPress={() => console.log('Edit button pressed')}
            style={{ flex: 1 }}
          />

          <Button
            title='Download'
            rightIcon={<Ionicons name='share' size={20} color='#FFFFFF' />}
            onPress={() => console.log('Download button pressed')}
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
