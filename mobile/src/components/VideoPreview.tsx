import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { theme } from '../theme';

interface VideoPreviewProps {
  uri: string;
  style?: any;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ uri, style }) => {
  const videoRef = useRef<Video>(null);

  return (
    <View style={[styles.container, style]}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width - theme.spacing.lg * 2,
    height: 300,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface
  },
  video: {
    width: '100%',
    height: '100%'
  }
});
