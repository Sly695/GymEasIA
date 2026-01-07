import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { api } from '../services/api.service';
import { InferenceResult, Video } from '../types';
import { POLL_INTERVAL } from '../config';

const AnalyzeScreen = ({ route, navigation }: any) => {
  const { videoId } = route.params;
  const [video, setVideo] = useState<Video | null>(null);
  const [inference, setInference] = useState<InferenceResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const loadData = async () => {
    try {
      const videoData = await api.getVideo(videoId);
      setVideo(videoData);
      setProcessing(videoData.status === 'PROCESSING');

      const inferenceData = await api.getInference(videoId);
      if (inferenceData) {
        setInference(inferenceData);
        setProcessing(false);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [videoId]);

  useEffect(() => {
    if (processing) {
      const interval = setInterval(async () => {
        try {
          const inferenceData = await api.getInference(videoId);
          if (inferenceData) {
            setInference(inferenceData);
            setProcessing(false);
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Polling error:', error);
        }
      }, POLL_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [processing, videoId]);

  if (loading) {
    return (
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.container}
      >
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analysis</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {processing ? (
          <Card style={styles.processingCard}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
            <Text style={styles.processingText}>AI is analyzing your video...</Text>
            <Text style={styles.processingSubtext}>This may take a few seconds</Text>
          </Card>
        ) : inference ? (
          <>
            <View style={styles.results}>
              <Card style={styles.resultCard}>
                <Text style={styles.resultLabel}>Reps</Text>
                <Text style={styles.resultValue}>{inference.reps}</Text>
              </Card>

              <Card style={styles.resultCard}>
                <Text style={styles.resultLabel}>Load</Text>
                <Text style={styles.resultValue}>--</Text>
                <Text style={styles.resultNote}>Mock data</Text>
              </Card>

              <Card style={styles.resultCard}>
                <Text style={styles.resultLabel}>Score</Text>
                <Text style={styles.resultValue}>
                  {Math.round(inference.confidence * 100)}%
                </Text>
              </Card>
            </View>

            <Card style={styles.analysisCard} variant="glass">
              <Text style={styles.analysisTitle}>AI Analysis</Text>
              <Text style={styles.analysisText}>{inference.notes}</Text>

              <View style={styles.tags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Hypertrophy</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Tempo</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Form Check</Text>
                </View>
              </View>
            </Card>

            <Card style={styles.progressCard}>
              <Text style={styles.progressTitle}>Progression</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${inference.confidence * 100}%` }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                Confidence: {Math.round(inference.confidence * 100)}%
              </Text>
            </Card>
          </>
        ) : (
          <Card style={styles.errorCard}>
            <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
            <Text style={styles.errorText}>Analysis not available</Text>
          </Card>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: 60
  },
  headerTitle: {
    ...theme.typography.h2
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.lg
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  processingCard: {
    alignItems: 'center',
    padding: theme.spacing.xl
  },
  processingText: {
    ...theme.typography.h3,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs
  },
  processingSubtext: {
    ...theme.typography.caption
  },
  results: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg
  },
  resultCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md
  },
  resultLabel: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.xs
  },
  resultValue: {
    ...theme.typography.h1,
    color: theme.colors.accent
  },
  resultNote: {
    ...theme.typography.caption,
    fontSize: 10,
    marginTop: theme.spacing.xs
  },
  analysisCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg
  },
  analysisTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md
  },
  analysisText: {
    ...theme.typography.body,
    marginBottom: theme.spacing.md,
    lineHeight: 24
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm
  },
  tag: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.accent + '20',
    borderWidth: 1,
    borderColor: theme.colors.accent
  },
  tagText: {
    ...theme.typography.caption,
    color: theme.colors.accent
  },
  progressCard: {
    marginBottom: theme.spacing.lg
  },
  progressTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.round
  },
  progressText: {
    ...theme.typography.caption
  },
  errorCard: {
    alignItems: 'center',
    padding: theme.spacing.xl
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    marginTop: theme.spacing.md
  }
});

export default AnalyzeScreen;
