import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

interface Artist {
  id: string;
  name: string;
  image: string;
  songCount: number;
}

const ArtistsScreen = () => {
  const { tracks } = useMusicPlayer();
  
  // Extract unique artists from tracks
  const artistsMap = tracks.reduce((acc, track) => {
    if (!acc[track.artist]) {
      acc[track.artist] = {
        id: track.artist.toLowerCase().replace(/\s+/g, '-'),
        name: track.artist,
        image: track.artwork,
        songCount: 1,
      };
    } else {
      acc[track.artist].songCount += 1;
    }
    return acc;
  }, {} as Record<string, Artist>);
  
  const artists = Object.values(artistsMap);
  
  const renderArtistItem = ({ item }: { item: Artist }) => (
    <TouchableOpacity style={styles.artistItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.artistImage} 
      />
      <Text style={styles.artistName}>{item.name}</Text>
      <Text style={styles.songCount}>
        {item.songCount} {item.songCount === 1 ? 'song' : 'songs'}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={renderArtistItem}
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
  artistItem: {
    flex: 1,
    margin: SPACING.sm,
    alignItems: 'center',
  },
  artistImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: SPACING.sm,
  },
  artistName: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  songCount: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
});

export default ArtistsScreen;