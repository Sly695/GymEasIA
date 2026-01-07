import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { api } from '../services/api.service';
import { Video } from '../types';

const HistoryScreen = ({ navigation }: any) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadVideos = async () => {
    try {
      const data = await api.getVideos();
      setVideos(data);
    } catch (error) {
      console.error('Failed to load videos:', error);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVideos();
    setRefreshing(false);
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.accent} />
        }
      >
        {videos.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="time-outline" size={64} color={theme.colors.textMuted} />
            <Text style={styles.emptyText}>No workouts yet</Text>
            <Text style={styles.emptySubtext}>Start recording to see your history</Text>
          </Card>
        ) : (
          videos.map((video) => (
            <TouchableOpacity
              key={video.id}
              onPress={() => navigation.navigate('Analyze', { videoId: video.id })}
            >
              <Card style={styles.videoCard}>
                <View style={styles.videoContent}>
                  <View style={styles.videoLeft}>
                    <Ionicons name="videocam" size={24} color={theme.colors.accent} />
                    <View style={styles.videoInfo}>
                      <Text style={styles.videoName}>{video.filename}</Text>
                      <Text style={styles.videoDate}>
                        {new Date(video.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.videoRight}>
                    <View
                      style={[
                        styles.statusBadge,
                        video.status === 'DONE' && styles.statusDone,
                        video.status === 'PROCESSING' && styles.statusProcessing,
                        video.status === 'FAILED' && styles.statusFailed
                      ]}
                    >
                      <Text style={styles.statusText}>{video.status}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: 60
  },
  title: {
    ...theme.typography.h1
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.lg
  },
  emptyCard: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xl
  },
  emptyText: {
    ...theme.typography.h3,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs
  },
  emptySubtext: {
    ...theme.typography.caption
  },
  videoCard: {
    marginBottom: theme.spacing.md
  },
  videoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  videoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  videoInfo: {
    marginLeft: theme.spacing.md,
    flex: 1
  },
  videoName: {
    ...theme.typography.body,
    marginBottom: theme.spacing.xs
  },
  videoDate: {
    ...theme.typography.caption
  },
  videoRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceLight
  },
  statusDone: {
    backgroundColor: theme.colors.success + '20'
  },
  statusProcessing: {
    backgroundColor: theme.colors.warning + '20'
  },
  statusFailed: {
    backgroundColor: theme.colors.error + '20'
  },
  statusText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export default HistoryScreen;
