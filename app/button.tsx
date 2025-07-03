import Button from '@/components/button';
import { ScrollView, Text, View } from 'react-native';

export default function ButtonPage() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <Text style={{ marginBottom: 8 }}>Buttons</Text>
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
      </View>
    </ScrollView>
  );
}
