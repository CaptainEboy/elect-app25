import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withRepeat,
  withSequence,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { COLORS } from '@/constants/theme';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

const BAR_COUNT = 12;

const getRandomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const Visualizer = () => {
  const { isPlaying } = useMusicPlayer();
  const heights = Array(BAR_COUNT).fill(0).map(() => useSharedValue(0.1));
  
  useEffect(() => {
    if (isPlaying) {
      // Animate bars when music is playing
      heights.forEach((height, index) => {
        const animate = () => {
          const randomHeight = getRandomValue(0.2, 1);
          const duration = getRandomValue(500, 1000);
          
          height.value = withSequence(
            withTiming(randomHeight, { 
              duration, 
              easing: Easing.inOut(Easing.ease) 
            }),
            withTiming(getRandomValue(0.1, 0.3), { 
              duration: duration * 0.8, 
              easing: Easing.inOut(Easing.ease) 
            }, () => {
              // Callback to continue animation
              if (isPlaying) {
                animate();
              }
            })
          );
        };
        
        // Start animation with staggered delay
        setTimeout(animate, index * 50);
      });
    } else {
      // Reset to minimal height when paused
      heights.forEach((height) => {
        height.value = withTiming(0.1, { duration: 600 });
      });
    }
  }, [isPlaying]);
  
  const barStyles = heights.map((height) =>
    useAnimatedStyle(() => ({
      height: `${height.value * 100}%`,
      opacity: 0.7 + (height.value * 0.3), // Higher bars are more opaque
    }))
  );
  
  return (
    <View style={styles.container}>
      {heights.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            barStyles[index],
            {
              backgroundColor: index % 3 === 0 
                ? COLORS.primary 
                : index % 3 === 1 
                  ? COLORS.secondary 
                  : COLORS.accent
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  bar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
});

export default Visualizer;