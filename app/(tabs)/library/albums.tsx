import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  songCount: number;
}

const AlbumsScreen = () => {
  const { tracks } = useMusicPlayer();
  
  // Extract unique albums from tracks
  const albumsMap = tracks.reduce((acc, track) => {
    if (!acc[track.album]) {
      acc[track.album] = {
        id: track.album.toLowerCase().replace(/\s+/g, '-'),
        title: track.album,
        artist: track.artist,
        artwork: track.artwork,
        songCount: 1,
      };
    } else {
      acc[track.album].songCount += 1;
    }
    return acc;
  }, {} as Record<string, Album>);
  
  const albums = Object.values(albumsMap);
  
  const renderAlbumItem = ({ item }: { item: Album }) => (
    <TouchableOpacity style={styles.albumItem}>
      <Image 
        source={{ uri: item.artwork }} 
        style={styles.albumCover} 
      />
      <Text style={styles.albumTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.albumArtist} numberOfLines={1}>
        {item.artist}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        renderItem={renderAlbumItem}
        numColumns={2}
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
  listContent: {
    padding: SPACING.md,
    paddingBottom: 100, // Extra space for mini player and tab bar
  },
  albumItem: {
    flex: 1,
    margin: SPACING.sm,
    maxWidth: '50%',
  },
  albumCover: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  albumTitle: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  albumArtist: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
});

export default AlbumsScreen;