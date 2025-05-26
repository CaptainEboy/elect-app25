import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { COLORS, SPACING, FONT_FAMILY, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import SongListItem from '@/components/UI/SongListItem';
import { Track } from '@/context/MusicPlayerContext';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const SearchScreen = () => {
  const { tracks } = useMusicPlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredTracks([]);
      return;
    }
    
    const query = text.toLowerCase();
    const filtered = tracks.filter(
      track => 
        track.title.toLowerCase().includes(query) || 
        track.artist.toLowerCase().includes(query) ||
        track.album.toLowerCase().includes(query)
    );
    
    setFilteredTracks(filtered);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredTracks([]);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        
        <View style={styles.searchBarContainer}>
          <SearchIcon size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          
          <TextInput
            style={styles.searchInput}
            placeholder="Songs, artists, or albums"
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            returnKeyType="search"
          />
          
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={16} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {searchQuery.length > 0 ? (
        <Animated.View 
          style={styles.resultsContainer}
          entering={FadeIn}
          exiting={FadeOut}
        >
          {filteredTracks.length > 0 ? (
            <FlatList
              data={filteredTracks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SongListItem 
                  track={item} 
                  onOptionsPress={() => {}}
                />
              )}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No results found for "{searchQuery}"
              </Text>
              <Text style={styles.noResultsSubtext}>
                Try searching for a different term
              </Text>
            </View>
          )}
        </Animated.View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Search for your favorite songs, artists, and albums
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
  },
  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xxl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLighter,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  resultsContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, // Extra space for mini player and tab bar
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  noResultsText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  emptyStateText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default SearchScreen;