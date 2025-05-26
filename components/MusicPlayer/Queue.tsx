import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { X, GripVertical } from 'lucide-react-native';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { Track } from '@/context/MusicPlayerContext';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const QueueItem = ({ 
  track, 
  onRemove, 
  onPlay 
}: { 
  track: Track; 
  onRemove: () => void; 
  onPlay: () => void;
}) => {
  return (
    <Animated.View 
      style={styles.queueItem}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <TouchableOpacity style={styles.dragHandle}>
        <GripVertical size={16} color={COLORS.textSecondary} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.queueItemContent}
        onPress={onPlay}
      >
        <Image 
          source={{ uri: track.artwork }} 
          style={styles.queueItemArt} 
        />
        
        <View style={styles.queueItemText}>
          <Text style={styles.queueItemTitle} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={styles.queueItemArtist} numberOfLines={1}>
            {track.artist}
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={onRemove}
      >
        <X size={16} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const Queue = () => {
  const { queue, removeFromQueue, playTrack } = useMusicPlayer();
  
  if (queue.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your queue is empty</Text>
        <Text style={styles.emptySubtext}>
          Add songs to play next
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming Up Next</Text>
      
      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QueueItem 
            track={item} 
            onRemove={() => removeFromQueue(item.id)}
            onPlay={() => playTrack(item)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING.lg,
  },
  title: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  list: {
    paddingBottom: SPACING.xxl,
  },
  queueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  dragHandle: {
    paddingRight: SPACING.sm,
  },
  queueItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueItemArt: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.md,
  },
  queueItemText: {
    flex: 1,
  },
  queueItemTitle: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
  },
  queueItemArtist: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  removeButton: {
    padding: SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  emptyText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default Queue;