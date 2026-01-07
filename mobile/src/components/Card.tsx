import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { theme } from '../theme';

interface CardProps {
  children: ReactNode;
  style?: any;
  variant?: 'default' | 'glass';
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'default' }) => {
  if (variant === 'glass') {
    return (
      <BlurView intensity={20} tint="dark" style={[styles.card, styles.glassCard, style]}>
        {children}
      </BlurView>
    );
  }

  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder
  },
  glassCard: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.glassBorder
  }
});
