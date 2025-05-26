import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { ChevronDown, Heart, Share2 } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import Controls from '@/components/MusicPlayer/Controls';
import Queue from '@/components/MusicPlayer/Queue';
import Visualizer from '@/components/MusicPlayer/Visualizer';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  interpolateColor 
} from 'react-native-reanimated';

const PlayerScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentTrack, isPlaying } = useMusicPlayer();
  
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);
  
  useEffect(() => {
    // Start animations when component mounts
    opacity.value = withTiming(1, { duration: 600 });
    
    // Album art rotation when playing
    if (isPlaying) {
      rotation.value = withTiming(rotation.value + 360, { 
        duration: 20000, 
        easing: Easing.linear 
      });
    }
  }, [isPlaying]);
  
  // Album art animation
  const albumArtStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
      opacity: opacity.value,
    };
  });
  
  const animatedGradientStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  
  if (!currentTrack) {
    return (
      <View style={[styles.container, styles.noTrackContainer]}>
        <Text style={styles.noTrackText}>No track selected</Text>
        <Text style={styles.noTrackSubtext}>
          Select a track from your library to start listening
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.backgroundLight, COLORS.background, COLORS.background]}
        style={StyleSheet.absoluteFill}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header, { paddingTop: insets.top || SPACING.lg }]}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <ChevronDown size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Now Playing</Text>
          
          <View style={{ width: 40 }} />
        </View>
        
        <View style={styles.albumContainer}>
          <Animated.View style={[styles.albumArtContainer, albumArtStyle]}>
            <Image 
              source={{ uri: currentTrack.artwork }} 
              style={styles.albumArt} 
            />
          </Animated.View>
        </View>
        
        <View style={styles.trackInfoContainer}>
          <Text style={styles.trackTitle}>{currentTrack.title}</Text>
          <Text style={styles.trackArtist}>{currentTrack.artist}</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart 
              size={24} 
              color={COLORS.textSecondary}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Share2 
              size={24} 
              color={COLORS.textSecondary}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        </View>
        
        <Visualizer />
        <Controls />
        <Queue />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundLighter,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  albumContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  albumArtContainer: {
    width: 280,
    height: 280,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  albumArt: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.lg,
  },
  trackInfoContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  trackTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  trackArtist: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  noTrackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  noTrackText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  noTrackSubtext: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default PlayerScreen;