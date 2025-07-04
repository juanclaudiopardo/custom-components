import Button from '@/components/button';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 16,
      }}
    >
      <Link href='/button' asChild>
        <Button title='Go to Button Components' />
      </Link>
      <Link href='/input' asChild>
        <Button title='Go to Input Components' />
      </Link>
    </View>
  );
}
