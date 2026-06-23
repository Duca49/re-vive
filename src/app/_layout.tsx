import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AvisosProvider } from '../context/AvisosContext';

export default function RootLayout() {
  return (
    <AvisosProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </AvisosProvider>
  );
}