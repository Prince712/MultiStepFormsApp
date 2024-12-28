import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Step {step} of {totalSteps}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barForeground, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  barBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 5,
  },
  barForeground: {
    height: 8,
    backgroundColor: '#6200EE',
    borderRadius: 4,
  },
});

export default ProgressBar;
