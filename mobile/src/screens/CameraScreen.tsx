import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { theme } from '../theme';
import { api } from '../services/api.service';

const { width, height } = Dimensions.get('window');
const MAX_RECORDING_DURATION = 60; // 60 secondes max

const CameraScreen = ({ navigation }: any) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const videoRef = useRef<Video>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingPromiseRef = useRef<Promise<{ uri: string }> | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (permission && !permission.granted && !permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  // Réinitialiser cameraReady quand on change de face de caméra
  useEffect(() => {
    setCameraReady(false);
  }, [facing]);

  // Animation du bouton pendant l'enregistrement
  useEffect(() => {
    if (recording) {
      // Animation de scale
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Animation de pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= MAX_RECORDING_DURATION) {
            handleStopRecording();
            return MAX_RECORDING_DURATION;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      scaleAnim.setValue(1);
      pulseAnim.setValue(1);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [recording]);

  const handleStartRecording = async () => {
    if (!cameraRef.current) {
      Alert.alert('Error', 'Camera not available');
      return;
    }

    if (recording) {
      return;
    }

    if (!cameraReady) {
      Alert.alert('Camera not ready', 'Please wait for the camera to initialize');
      return;
    }

    try {
      // Vérifier à nouveau que la caméra est toujours disponible
      if (!cameraRef.current) {
        throw new Error('Camera reference lost');
      }
      
      setRecording(true);
      setRecordingDuration(0);
      
      // recordAsync() démarre l'enregistrement et retourne une promesse
      // qui se résout avec l'URI quand stopRecording() est appelé
      recordingPromiseRef.current = cameraRef.current.recordAsync({
        maxDuration: MAX_RECORDING_DURATION,
        quality: '720p',
      });

      // La promesse se résoudra quand stopRecording() est appelé
      recordingPromiseRef.current
        .then((recordingResult) => {
          if (recordingResult && recordingResult.uri) {
            setPreviewUri(recordingResult.uri);
            setRecording(false);
          } else {
            setRecording(false);
          }
          recordingPromiseRef.current = null;
        })
        .catch((error: any) => {
          console.error('Recording promise error:', error);
          setRecording(false);
          recordingPromiseRef.current = null;
          if (error.message && !error.message.includes('Recording stopped')) {
            Alert.alert('Error', error.message || 'Failed to record video');
          }
        });

    } catch (error: any) {
      console.error('Recording error:', error);
      setRecording(false);
      recordingPromiseRef.current = null;
      
      if (error.message && error.message.includes('not ready')) {
        // Réessayer après un court délai
        console.log('Camera not ready, retrying in 1 second...');
        setTimeout(() => {
          if (cameraReady && !recording && cameraRef.current) {
            console.log('Auto-retrying recording...');
            handleStartRecording();
          }
        }, 1000);
      } else {
        Alert.alert('Error', error.message || 'Failed to start recording');
      }
    }
  };

  const handleStopRecording = async () => {
    if (cameraRef.current && recording) {
      try {
        await cameraRef.current.stopRecording();
        // L'état sera mis à jour par la promesse de recordAsync qui se résoudra maintenant
      } catch (error: any) {
        console.error('Stop recording error:', error);
        setRecording(false);
        recordingPromiseRef.current = null;
      }
    }
  };

  const handleLongPress = () => {
    handleStartRecording();
  };

  const handlePressOut = () => {
    if (recording) {
      handleStopRecording();
    }
  };

  const handleRetry = () => {
    setPreviewUri(null);
    setRecordingDuration(0);
  };

  const handleSend = async () => {
    if (!previewUri) return;

    setUploading(true);
    try {
      const video = await api.uploadVideo(previewUri);
      navigation.navigate('Analyze', { videoId: video.id });
    } catch (error: any) {
      Alert.alert('Upload Error', error.message || 'Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const handleSelectFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant access to your media library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [ImagePicker.MediaType.Videos],
        allowsEditing: true,
        quality: 1
      });

      if (!result.canceled && result.assets[0]) {
        setPreviewUri(result.assets[0].uri);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to select video');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera permission is required</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Aperçu vidéo
  if (previewUri) {
    return (
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: previewUri }}
          style={styles.previewVideo}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
        />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.previewOverlay}
        >
          <View style={styles.previewHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleRetry}
            >
              <Ionicons name="close" size={28} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={styles.previewTitle}>Review Video</Text>
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.previewBottom}>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRetry}
            >
              <Ionicons name="refresh" size={24} color={theme.colors.text} />
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color={theme.colors.background} />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={24} color={theme.colors.background} />
                  <Text style={styles.sendButtonText}>Analyze with AI</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="video"
        onCameraReady={() => {
          console.log('Camera ready callback fired');
          // Utiliser requestAnimationFrame pour s'assurer que la caméra est vraiment prête
          requestAnimationFrame(() => {
            // Attendre un délai supplémentaire pour que la caméra soit complètement initialisée
            setTimeout(() => {
              setCameraReady(true);
              console.log('Camera ready state set to true');
            }, 500);
          });
        }}
      />
      {/* Overlay avec positionnement absolu */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.7)']}
        style={styles.overlay}
      >
          {/* Header */}
          <View style={styles.topOverlay}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
              </TouchableOpacity>
              
              <View style={styles.headerCenter}>
                <View style={styles.aiIndicator}>
                  <Ionicons name="pulse" size={16} color={theme.colors.accent} />
                  <Text style={styles.aiText}>RepNet AI - Auto Detection</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
              >
                <Ionicons name="camera-reverse" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            {/* Timer pendant l'enregistrement */}
            {recording && (
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>
                  {formatTime(recordingDuration)} / {formatTime(MAX_RECORDING_DURATION)}
                </Text>
              </View>
            )}

            <Text style={styles.instructionText}>
              Position your full body in frame{'\n'}AI will detect your exercise automatically
            </Text>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomOverlay}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handleSelectFromGallery}
            >
              <Ionicons name="images" size={24} color={theme.colors.text} />
            </TouchableOpacity>

            {/* Bouton d'enregistrement style Snapchat */}
            <View style={styles.recordButtonContainer}>
              {!cameraReady ? (
                <View style={styles.recordButtonOuter}>
                  <View style={[styles.recordButton, styles.recordButtonDisabled]}>
                    <ActivityIndicator size="small" color={theme.colors.background} />
                  </View>
                </View>
              ) : (
                <Animated.View
                  style={[
                    styles.recordButtonOuter,
                    {
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.recordButtonOuter,
                      {
                        transform: [{ scale: scaleAnim }],
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.recordButton,
                        recording && styles.recordButtonActive
                      ]}
                      onLongPress={handleLongPress}
                      onPressOut={handlePressOut}
                      activeOpacity={0.9}
                      disabled={uploading || !cameraReady}
                    >
                      {recording ? (
                        <View style={styles.recordButtonInner} />
                      ) : (
                        <View style={styles.recordButtonInnerIdle} />
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>
              )}
            </View>

            <View style={styles.placeholderButton} />
          </View>
      </LinearGradient>

      {uploading && (
        <View style={styles.uploadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
          <Text style={styles.uploadingText}>Uploading to RepNet AI...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  camera: {
    flex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    pointerEvents: 'box-none'
  },
  topOverlay: {
    paddingTop: 50,
    paddingHorizontal: theme.spacing.md
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.glassBorder
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: theme.spacing.md
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.glass,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.accent
  },
  aiText: {
    ...theme.typography.caption,
    color: theme.colors.accent,
    marginLeft: theme.spacing.xs,
    fontWeight: '600'
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.error + '40',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.error
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
    marginRight: theme.spacing.xs
  },
  recordingText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: 'bold'
  },
  instructionText: {
    ...theme.typography.caption,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm
  },
  bottomOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: theme.spacing.xl
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.glassBorder
  },
  recordButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  recordButtonOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: theme.colors.background
  },
  recordButtonActive: {
    backgroundColor: theme.colors.error,
    borderRadius: 8,
    width: 50,
    height: 50
  },
  recordButtonDisabled: {
    opacity: 0.6,
    backgroundColor: theme.colors.textMuted
  },
  recordButtonInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: theme.colors.background
  },
  recordButtonInnerIdle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.background
  },
  placeholderButton: {
    width: 50,
    height: 50
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadingText: {
    ...theme.typography.body,
    marginTop: theme.spacing.md,
    color: theme.colors.text
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.lg
  },
  permissionButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'center'
  },
  permissionButtonText: {
    ...theme.typography.h3,
    color: theme.colors.background,
    fontWeight: 'bold'
  },
  // Preview styles
  previewVideo: {
    width: width,
    height: height
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between'
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: theme.spacing.lg
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.glass,
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewTitle: {
    ...theme.typography.h3,
    color: theme.colors.text
  },
  previewBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 40,
    paddingHorizontal: theme.spacing.lg
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.glass,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder
  },
  retryButtonText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md
  },
  sendButtonText: {
    ...theme.typography.h3,
    color: theme.colors.background,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm
  }
});

export default CameraScreen;
