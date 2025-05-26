import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play, Pause, SkipForward } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  Easing,
  withRepeat 
} from 'react-native-reanimated';

const MiniPlayer = () => {
  const router = useRouter();
  const { 
    currentTrack, 
    isPlaying, 
    pauseTrack, 
    resumeTrack, 
    playNext,
    progress
  } = useMusicPlayer();
  
  const rotation = useSharedValue(0);
  
  React.useEffect(() => {
    if (isPlaying) {
      rotation.value = withRepeat(
        withTiming(360, { 
          duration: 10000, 
          easing: Easing.linear 
        }), 
        -1, // infinite repeat
        false // no yoyo
      );
    } else {
      rotation.value = withTiming(rotation.value, { duration: 300 });
    }
  }, [isPlaying]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  
  if (!currentTrack) return null;
  
  const handleMiniPlayerPress = () => {
    router.navigate('/player');
  };
  
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={styles.container}
      onPress={handleMiniPlayerPress}
    >
      <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
      
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${progress * 100}%` }
          ]} 
        />
      </View>
      
      <View style={styles.content}>
        <Animated.View style={[styles.albumArtContainer, animatedStyle]}>
          <Image 
            source={{ uri: currentTrack.artwork }} 
            style={styles.albumArt} 
          />
        </Animated.View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
        </View>
        
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={isPlaying ? pauseTrack : resumeTrack}
          >
            {isPlaying ? (
              <Pause size={24} color={COLORS.textPrimary} />
            ) : (
              <Play size={24} color={COLORS.textPrimary} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={playNext}
          >
            <SkipForward size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarContainer: {
    height: 2,
    width: '100%',
    backgroundColor: COLORS.backgroundLighter,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  albumArtContainer: {
    height: 40,
    width: 40,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    marginRight: SPACING.md,
  },
  albumArt: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
  },
  artist: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
});

export default MiniPlayer;