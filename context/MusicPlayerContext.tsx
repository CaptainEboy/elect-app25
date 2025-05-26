import React, { createContext, useState, useCallback, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { sampleTracks } from '@/data/sampleData';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  url: string;
}

interface MusicPlayerContextType {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  currentPosition: number;
  sound: Audio.Sound | null;
  queue: Track[];
  playTrack: (track: Track) => Promise<void>;
  pauseTrack: () => Promise<void>;
  resumeTrack: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  reorderQueue: (startIndex: number, endIndex: number) => void;
  progress: number;
}

export const MusicPlayerContext = createContext<MusicPlayerContextType>({
  tracks: [],
  currentTrack: null,
  isPlaying: false,
  currentPosition: 0,
  sound: null,
  queue: [],
  playTrack: async () => {},
  pauseTrack: async () => {},
  resumeTrack: async () => {},
  seekTo: async () => {},
  playNext: async () => {},
  playPrevious: async () => {},
  addToQueue: () => {},
  removeFromQueue: () => {},
  clearQueue: () => {},
  reorderQueue: () => {},
  progress: 0,
});

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks] = useState<Track[]>(sampleTracks);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);
  const [progress, setProgress] = useState(0);

  // Configure audio mode
  useEffect(() => {
    async function configureAudio() {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: Platform.OS !== 'web',
        shouldDuckAndroid: true,
      });
    }
    
    configureAudio();
    
    return () => {
      // Cleanup sound when unmounting
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Update position every second when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentTrack) {
      interval = setInterval(async () => {
        if (sound) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setCurrentPosition(status.positionMillis / 1000);
            setProgress(status.positionMillis / (currentTrack.duration * 1000));
            
            // Auto-play next track when current one finishes
            if (status.didJustFinish) {
              playNext();
            }
          }
        }
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, sound, currentTrack]);

  const playTrack = async (track: Track) => {
    // Unload previous sound
    if (sound) {
      await sound.unloadAsync();
    }
    
    try {
      // Create and load new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.url },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
      );
      
      setSound(newSound);
      setCurrentTrack(track);
      setIsPlaying(true);
      setCurrentPosition(0);
      setProgress(0);
      
      // Add listeners for status updates
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        
        if (status.didJustFinish) {
          playNext();
        }
      });
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const pauseTrack = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeTrack = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const seekTo = async (position: number) => {
    if (sound && currentTrack) {
      await sound.setPositionAsync(position * 1000);
      setCurrentPosition(position);
      setProgress(position / currentTrack.duration);
    }
  };

  const playNext = async () => {
    if (!currentTrack) return;
    
    if (queue.length > 0) {
      // Play first track in queue
      const nextTrack = queue[0];
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      await playTrack(nextTrack);
    } else {
      // Play next track in list
      const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      await playTrack(tracks[nextIndex]);
    }
  };

  const playPrevious = async () => {
    if (!currentTrack) return;
    
    // If we're more than 3 seconds into the track, restart it
    if (currentPosition > 3) {
      await seekTo(0);
      return;
    }
    
    // Otherwise play previous track
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    await playTrack(tracks[prevIndex]);
  };

  const addToQueue = useCallback((track: Track) => {
    setQueue(prev => [...prev, track]);
  }, []);

  const removeFromQueue = useCallback((trackId: string) => {
    setQueue(prev => prev.filter(t => t.id !== trackId));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const reorderQueue = useCallback((startIndex: number, endIndex: number) => {
    const result = [...queue];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setQueue(result);
  }, [queue]);

  return (
    <MusicPlayerContext.Provider
      value={{
        tracks,
        currentTrack,
        isPlaying,
        currentPosition,
        sound,
        queue,
        playTrack,
        pauseTrack,
        resumeTrack,
        seekTo,
        playNext,
        playPrevious,
        addToQueue,
        removeFromQueue,
        clearQueue,
        reorderQueue,
        progress,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};