import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTitleStyle: {
            color: '#343a40',
          },
        }}
      />
      <Stack.Screen
        name='button'
        options={{
          title: 'Botones',
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTitleStyle: {
            color: '#343a40',
          },
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
}
