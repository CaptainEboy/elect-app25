import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MoreVertical, Play } from 'lucide-react-native';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { Track } from '@/context/MusicPlayerContext';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

interface SongListItemProps {
  track: Track;
  index?: number;
  showIndex?: boolean;
  onOptionsPress?: () => void;
}

const SongListItem: React.FC<SongListItemProps> = ({ 
  track, 
  index, 
  showIndex = false,
  onOptionsPress 
}) => {
  const { playTrack, currentTrack, isPlaying } = useMusicPlayer();
  
  const isCurrentTrack = currentTrack?.id === track.id;
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isCurrentTrack && styles.currentTrack
      ]}
      onPress={() => playTrack(track)}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        {showIndex && (
          <Text style={[
            styles.index,
            isCurrentTrack && styles.currentTrackText
          ]}>
            {index}
          </Text>
        )}
        
        <Image 
          source={{ uri: track.artwork }} 
          style={styles.artwork} 
        />
        
        <View style={styles.textContainer}>
          <Text 
            style={[
              styles.title,
              isCurrentTrack && styles.currentTrackText
            ]} 
            numberOfLines={1}
          >
            {track.title}
          </Text>
          <Text 
            style={[
              styles.artist,
              isCurrentTrack && styles.currentTrackSubText
            ]} 
            numberOfLines={1}
          >
            {track.artist}
          </Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Text style={[
          styles.duration,
          isCurrentTrack && styles.currentTrackSubText
        ]}>
          {formatDuration(track.duration)}
        </Text>
        
        <TouchableOpacity 
          style={styles.optionsButton}
          onPress={onOptionsPress}
        >
          <MoreVertical 
            size={16} 
            color={isCurrentTrack ? COLORS.primary : COLORS.textSecondary} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  currentTrack: {
    backgroundColor: COLORS.backgroundLighter,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  index: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    width: 24,
    textAlign: 'center',
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  artist: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginRight: SPACING.sm,
  },
  optionsButton: {
    padding: SPACING.xs,
  },
  currentTrackText: {
    color: COLORS.primary,
  },
  currentTrackSubText: {
    color: COLORS.primary + '99', // Adding transparency
  },
});

export default SongListItem;