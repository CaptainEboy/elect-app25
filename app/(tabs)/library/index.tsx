import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Music, User, Disc3, ListMusic } from 'lucide-react-native';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import SongListItem from '@/components/UI/SongListItem';

const LibraryScreen = () => {
  const router = useRouter();
  const { tracks } = useMusicPlayer();
  
  const navigateTo = (route: string) => {
    router.push(`/(tabs)/library/${route}`);
  };
  
  const recentlyPlayedTracks = tracks.slice(0, 5);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity 
          style={styles.categoryButton}
          onPress={() => navigateTo('songs')}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.primary }]}>
            <Music size={24} color={COLORS.background} />
          </View>
          <Text style={styles.categoryText}>Songs</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.categoryButton}
          onPress={() => navigateTo('artists')}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.secondary }]}>
            <User size={24} color={COLORS.background} />
          </View>
          <Text style={styles.categoryText}>Artists</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.categoryButton}
          onPress={() => navigateTo('albums')}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.accent }]}>
            <Disc3 size={24} color={COLORS.background} />
          </View>
          <Text style={styles.categoryText}>Albums</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.categoryButton}
          onPress={() => router.push('/(tabs)/playlists')}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.error }]}>
            <ListMusic size={24} color={COLORS.background} />
          </View>
          <Text style={styles.categoryText}>Playlists</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <TouchableOpacity onPress={() => navigateTo('songs')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tracksContainer}>
          {recentlyPlayedTracks.map((track) => (
            <SongListItem 
              key={track.id} 
              track={track} 
              onOptionsPress={() => {}}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  categoryButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  tracksContainer: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
});

export default LibraryScreen;