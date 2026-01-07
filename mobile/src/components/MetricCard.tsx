import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { theme } from '../theme';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  style?: any;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, style }) => {
  return (
    <Card style={[styles.metricCard, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  metricCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md
  },
  iconContainer: {
    marginBottom: theme.spacing.sm
  },
  value: {
    ...theme.typography.h2,
    color: theme.colors.accent,
    marginBottom: theme.spacing.xs
  },
  label: {
    ...theme.typography.caption,
    textAlign: 'center'
  }
});
