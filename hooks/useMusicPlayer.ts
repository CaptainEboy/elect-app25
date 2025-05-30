import { useContext } from 'react';
import { MusicPlayerContext } from '@/context/MusicPlayerContext';

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  
  return context;
}