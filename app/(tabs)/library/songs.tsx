import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import SongListItem from '@/components/UI/SongListItem';

const SongsScreen = () => {
  const { tracks } = useMusicPlayer();
  
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SongListItem 
            track={item} 
            index={index + 1}
            showIndex
            onOptionsPress={() => {}}
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
  listContent: {
    paddingBottom: 100, // Extra space for mini player and tab bar
  },
});

export default SongsScreen;