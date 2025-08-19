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
      <Link href='/divider' asChild>
        <Button title='Go to Divider Components' />
      </Link>
      <Link href='/skeleton' asChild>
        <Button title='Go to Skeleton Components' />
      </Link>
      <Link href='/toast' asChild>
        <Button title='Go to Toast Components' />
      </Link>
    </View>
  );
}
