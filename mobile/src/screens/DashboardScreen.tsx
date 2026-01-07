import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../store/AuthContext';
import { MetricCard } from '../components/MetricCard';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { api } from '../services/api.service';
import { Video } from '../types';

const DashboardScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [stats, setStats] = useState({
    calories: 0,
    workouts: 0,
    totalReps: 0
  });

  const loadData = async () => {
    try {
      const videos = await api.getVideos();
      setRecentVideos(videos.slice(0, 5));
      
      // Mock stats (in real app, calculate from videos/inferences)
      setStats({
        calories: 1250,
        workouts: videos.length,
        totalReps: videos.length * 12 // Mock
      });
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.accent} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>GymEasIA</Text>
          <Text style={styles.welcome}>Welcome back, {user?.username || 'Athlete'}</Text>
        </View>

        <View style={styles.metrics}>
          <MetricCard
            label="Calories burned"
            value={stats.calories}
            icon={<Ionicons name="flame" size={24} color={theme.colors.accent} />}
          />
          <MetricCard
            label="Workouts this week"
            value={stats.workouts}
            icon={<Ionicons name="barbell" size={24} color={theme.colors.accent} />}
          />
          <MetricCard
            label="Total reps"
            value={stats.totalReps}
            icon={<Ionicons name="repeat" size={24} color={theme.colors.accent} />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent History</Text>
          
          {recentVideos.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>No workouts yet</Text>
              <Text style={styles.emptySubtext}>Start recording to see your history</Text>
            </Card>
          ) : (
            recentVideos.map((video) => (
              <Card key={video.id} style={styles.historyCard}>
                <View style={styles.historyContent}>
                  <View style={styles.historyLeft}>
                    <Text style={styles.historyExercise}>Squat</Text>
                    <Text style={styles.historyType}>Full Body • High Intensity</Text>
                  </View>
                  <View style={styles.historyRight}>
                    <View style={styles.circle}>
                      <Text style={styles.circleText}>12</Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: 60
  },
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs
  },
  welcome: {
    ...theme.typography.body,
    color: theme.colors.textSecondary
  },
  metrics: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg
  },
  section: {
    padding: theme.spacing.lg
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md
  },
  emptyCard: {
    alignItems: 'center',
    padding: theme.spacing.xl
  },
  emptyText: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.xs
  },
  emptySubtext: {
    ...theme.typography.caption
  },
  historyCard: {
    marginBottom: theme.spacing.md
  },
  historyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  historyLeft: {
    flex: 1
  },
  historyExercise: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.xs
  },
  historyType: {
    ...theme.typography.caption
  },
  historyRight: {
    marginLeft: theme.spacing.md
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleText: {
    ...theme.typography.h2,
    color: theme.colors.background
  }
});

export default DashboardScreen;
