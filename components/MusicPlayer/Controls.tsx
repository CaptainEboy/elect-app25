import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withSpring 
} from 'react-native-reanimated';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

const Controls = () => {
  const { 
    isPlaying, 
    pauseTrack, 
    resumeTrack, 
    playNext, 
    playPrevious,
    currentTrack,
    currentPosition,
    seekTo,
    progress
  } = useMusicPlayer();
  
  const [repeat, setRepeat] = React.useState(false);
  const [shuffle, setShuffle] = React.useState(false);
  
  const playButtonScale = useSharedValue(1);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handlePlayPause = () => {
    // Animate the play button
    playButtonScale.value = withSpring(1.2, { damping: 10 }, () => {
      playButtonScale.value = withTiming(1);
    });
    
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };
  
  const handleSeek = (value: number) => {
    if (currentTrack) {
      seekTo(value * currentTrack.duration);
    }
  };
  
  const playButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: playButtonScale.value }
      ]
    };
  });
  
  if (!currentTrack) return null;
  
  return (
    <View style={styles.container}>
      {/* Seekbar */}
      <View style={styles.seekBarContainer}>
        <View style={styles.seekBar}>
          <View style={[styles.seekBarFill, { width: `${progress * 100}%` }]} />
          <TouchableOpacity 
            style={[
              styles.seekBarThumb, 
              { left: `${progress * 100}%` }
            ]} 
            onPress={() => {}} 
          />
        </View>
        
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
          <Text style={styles.timeText}>{formatTime(currentTrack.duration)}</Text>
        </View>
      </View>
      
      {/* Main controls */}
      <View style={styles.mainControls}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setShuffle(!shuffle)}
        >
          <Shuffle 
            size={20} 
            color={shuffle ? COLORS.primary : COLORS.textSecondary} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={playPrevious}
        >
          <SkipBack size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        
        <Animated.View style={[styles.playButtonContainer, playButtonStyle]}>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={handlePlayPause}
          >
            {isPlaying ? (
              <Pause size={32} color={COLORS.background} />
            ) : (
              <Play size={32} color={COLORS.background} />
            )}
          </TouchableOpacity>
        </Animated.View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={playNext}
        >
          <SkipForward size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setRepeat(!repeat)}
        >
          <Repeat 
            size={20} 
            color={repeat ? COLORS.primary : COLORS.textSecondary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  seekBarContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  seekBar: {
    height: 4,
    width: '100%',
    backgroundColor: COLORS.backgroundLighter,
    borderRadius: 2,
    position: 'relative',
  },
  seekBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  seekBarThumb: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: -4,
    marginLeft: -6,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  timeText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  secondaryButton: {
    padding: SPACING.sm,
  },
  button: {
    padding: SPACING.md,
  },
  playButtonContainer: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButton: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Controls;