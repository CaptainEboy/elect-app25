import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import PlaylistCard from '@/components/UI/PlaylistCard';
import { samplePlaylists } from '@/data/sampleData';

const PlaylistsScreen = () => {
  const insets = useSafeAreaInsets();
  const { tracks } = useMusicPlayer();
  
  const getTrackCount = (trackIds: string[]) => {
    return trackIds.length;
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top || SPACING.lg }]}>
        <Text style={styles.title}>Playlists</Text>
        
        <TouchableOpacity style={styles.createButton}>
          <Plus size={24} color={COLORS.background} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={samplePlaylists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaylistCard
            id={item.id}
            name={item.name}
            description={item.description}
            coverImage={item.coverImage}
            trackCount={getTrackCount(item.trackIds)}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xxl,
    color: COLORS.textPrimary,
  },
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: 100, // Extra space for mini player and tab bar
  },
});

export default PlaylistsScreen;