import { Tabs } from 'expo-router';
import { Platform, View, StyleSheet } from 'react-native';
import { Library, Search, Disc3, ListMusic } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MiniPlayer from '@/components/MusicPlayer/MiniPlayer';
import { COLORS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { currentTrack } = useMusicPlayer();
  
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopWidth: 0,
            height: 56 + (Platform.OS === 'ios' ? insets.bottom : 0),
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarLabelStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 12,
          },
          tabBarBackground: () => (
            <BlurView 
              intensity={80} 
              tint="dark" 
              style={StyleSheet.absoluteFill}
            />
          ),
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color, size }) => (
              <Library size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search/index"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Search size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="player/index"
          options={{
            title: 'Player',
            tabBarIcon: ({ color, size }) => (
              <Disc3 size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists/index"
          options={{
            title: 'Playlists',
            tabBarIcon: ({ color, size }) => (
              <ListMusic size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      
      {currentTrack && (
        <View style={[
          styles.miniPlayerContainer, 
          { bottom: 56 + (Platform.OS === 'ios' ? insets.bottom : 0) }
        ]}>
          <MiniPlayer />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  miniPlayerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
  }
});


// import { Tabs } from 'expo-router';
// import { Platform, View, StyleSheet } from 'react-native';
// import { Library, Search, Disc3, ListMusic } from 'lucide-react-native';
// import { BlurView } from 'expo-blur';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import MiniPlayer from '@/components/MusicPlayer/MiniPlayer';
// import { COLORS } from '@/constants/theme';
// import { useMusicPlayer } from '@/hooks/useMusicPlayer';

// export default function TabLayout() {
//   const insets = useSafeAreaInsets();
//   const { currentTrack } = useMusicPlayer();
  
//   return (
//     <View style={{ flex: 1 }}>
//       <Tabs
//         screenOptions={{
//           tabBarStyle: {
//             backgroundColor: COLORS.background,
//             borderTopWidth: 0,
//             height: 56 + (Platform.OS === 'ios' ? insets.bottom : 0),
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             elevation: 0,
//           },
//           tabBarActiveTintColor: COLORS.primary,
//           tabBarInactiveTintColor: COLORS.textSecondary,
//           tabBarLabelStyle: {
//             fontFamily: 'Inter-Medium',
//             fontSize: 12,
//           },
//           tabBarBackground: () => (
//             <BlurView 
//               intensity={80} 
//               tint="dark" 
//               style={StyleSheet.absoluteFill}
//             />
//           ),
//           headerShown: false,
//         }}
//       >
//         <Tabs.Screen
//           name="library"
//           options={{
//             title: 'Library',
//             tabBarIcon: ({ color, size }) => (
//               <Library size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="search"
//           options={{
//             title: 'Search',
//             tabBarIcon: ({ color, size }) => (
//               <Search size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="player"
//           options={{
//             title: 'Player',
//             tabBarIcon: ({ color, size }) => (
//               <Disc3 size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="playlists"
//           options={{
//             title: 'Playlists',
//             tabBarIcon: ({ color, size }) => (
//               <ListMusic size={size} color={color} />
//             ),
//           }}
//         />
//       </Tabs>
      
//       {currentTrack && (
//         <View style={[
//           styles.miniPlayerContainer, 
//           { bottom: 56 + (Platform.OS === 'ios' ? insets.bottom : 0) }
//         ]}>
//           <MiniPlayer />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   miniPlayerContainer: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     zIndex: 999,
//   }
// });