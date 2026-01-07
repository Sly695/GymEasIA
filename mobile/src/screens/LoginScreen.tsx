import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../store/AuthContext';
import { theme } from '../theme';

const LoginScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await login(email, password);
      } else {
        if (!username.trim()) {
          setError('Username is required');
          return;
        }
        await register(email, username, password);
      }
    } catch (err: any) {
      const errorMessage = err.message || err.response?.data?.error || 'An error occurred';
      setError(errorMessage);
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.logo}>GymEasIA</Text>
            <Text style={styles.slogan}>AI-Powered Performance Tracking</Text>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'login' && styles.activeTab]}
              onPress={() => setActiveTab('login')}
            >
              <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
                Log In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'register' && styles.activeTab]}
              onPress={() => setActiveTab('register')}
            >
              <Text style={[styles.tabText, activeTab === 'register' && styles.activeTabText]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />

            {activeTab === 'register' && (
              <Input
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
              />
            )}

            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            {activeTab === 'login' && (
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot?</Text>
              </TouchableOpacity>
            )}

            <Button
              title="START TRAINING"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitButton}
            />

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={24} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  keyboardView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl
  },
  logo: {
    ...theme.typography.h1,
    fontSize: 48,
    color: theme.colors.accent,
    marginBottom: theme.spacing.sm
  },
  slogan: {
    ...theme.typography.caption,
    fontSize: 16
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: 4,
    marginBottom: theme.spacing.lg
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm
  },
  activeTab: {
    backgroundColor: theme.colors.accent
  },
  tabText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary
  },
  activeTabText: {
    color: theme.colors.background,
    fontWeight: 'bold'
  },
  form: {
    width: '100%'
  },
  input: {
    marginBottom: theme.spacing.md
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginBottom: theme.spacing.sm
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.md
  },
  forgotText: {
    ...theme.typography.caption,
    color: theme.colors.accent
  },
  submitButton: {
    marginBottom: theme.spacing.lg
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.md
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.glassBorder
  }
});

export default LoginScreen;
