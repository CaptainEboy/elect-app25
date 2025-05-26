import { Stack } from 'expo-router';
import { COLORS } from '@/constants/theme';

export default function LibraryLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontFamily: 'Inter-Bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Library',
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontFamily: 'Inter-Bold',
            color: COLORS.textPrimary,
          },
          headerLargeStyle: {
            backgroundColor: COLORS.background,
          },
        }} 
      />
      <Stack.Screen name="artists" options={{ title: 'Artists' }} />
      <Stack.Screen name="albums" options={{ title: 'Albums' }} />
      <Stack.Screen name="songs" options={{ title: 'Songs' }} />
    </Stack>
  );
}