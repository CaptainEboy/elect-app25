import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play } from 'lucide-react-native';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withSequence 
} from 'react-native-reanimated';

interface PlaylistCardProps {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  trackCount: number;
  onPress: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  name,
  description,
  coverImage,
  trackCount,
  onPress
}) => {
  const scale = useSharedValue(1);
  
  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };
  
  const handlePressOut = () => {
    scale.value = withSequence(
      withTiming(1.02, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity 
        onPress={onPress} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <Image 
          source={{ uri: coverImage }} 
          style={styles.coverImage} 
        />
        
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          <View>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
            <Text style={styles.trackCount}>
              {trackCount} {trackCount === 1 ? 'song' : 'songs'}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.playButton}>
            <Play size={24} color={COLORS.background} fill={COLORS.background} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  touchable: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  description: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    opacity: 0.8,
  },
  trackCount: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textPrimary,
    opacity: 0.6,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
});

export default PlaylistCard;