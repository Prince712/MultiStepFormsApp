import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { saveCompanyInfo } from '../redux/formSlice';
import ProgressBar from '../components/ProgressBar';
import { colors, fontSizes, spacing } from '../styles/theme';

const CompanyInfo = ({ navigation }) => {
  const dispatch = useDispatch();

  // Local states to manage checkboxes and radio buttons
  const [selectedFields, setSelectedFields] = useState([]);
  const [employeeCount, setEmployeeCount] = useState('');
  const [wfhPolicy, setWfhPolicy] = useState('');

  const toggleCheckbox = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((item) => item !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleSubmit = () => {
    if (selectedFields.length === 0 || !employeeCount || !wfhPolicy) {
      alert('Please fill out all fields before proceeding.');
      return;
    }

    const formData = {
      fields: selectedFields,
      employeeCount,
      wfhPolicy,
    };

    dispatch(saveCompanyInfo(formData));
    navigation.navigate('PlanSelection');
  };

  return (
    <View style={styles.container}>
      {/* Fixed Progress Bar */}
      <View style={styles.progressBarContainer}>
        <ProgressBar step={2} totalSteps={3} />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Company Fields */}
        <Text style={styles.label}>Your company is working on which field?</Text>
        <View style={styles.checkboxGroup}>
          {['Tech', 'Marketing', 'Finance', 'HR'].map((field) => (
            <TouchableOpacity
              key={field}
              style={styles.checkboxContainer}
              onPress={() => toggleCheckbox(field)}
            >
              <View style={[styles.checkbox, selectedFields.includes(field) && styles.checkboxSelected]} />
              <Text style={styles.checkboxLabel}>{field}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Employee Count */}
        <Text style={styles.label}>How many employees are in your company?</Text>
        <View style={styles.radioGroup}>
          {['1-10', '10-20', '20-30', '40+'].map((range) => (
            <TouchableOpacity
              key={range}
              style={styles.radioContainer}
              onPress={() => setEmployeeCount(range)}
            >
              <View style={[styles.radioCircle, employeeCount === range && styles.radioSelected]} />
              <Text style={styles.radioLabel}>{range}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* WFH Policy */}
        <Text style={styles.label}>Does the company have a WFH policy?</Text>
        <View style={styles.radioGroup}>
          {['Yes', 'No'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioContainer}
              onPress={() => setWfhPolicy(option)}
            >
              <View style={[styles.radioCircle, wfhPolicy === option && styles.radioSelected]} />
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, marginRight: spacing.small }}>
            <Button title="Previous" color={colors.buttonDisabled} onPress={() => navigation.goBack()} />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.small }}>
            <Button title="Next" color={colors.primary} onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  progressBarContainer: {
    padding: spacing.medium,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  formContainer: { padding: spacing.large, backgroundColor: colors.background },
  label: { fontSize: fontSizes.medium, fontWeight: 'bold', marginBottom: spacing.small, color: colors.text },
  
  // Checkbox styles
  checkboxGroup: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.medium },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.medium,
    marginBottom: spacing.small,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.small,
  },
  checkboxSelected: { backgroundColor: colors.primary },
  checkboxLabel: { fontSize: fontSizes.medium, color: colors.text },

  // Radio button styles
  radioGroup: { marginBottom: spacing.medium },
  radioContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.small },
  radioCircle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginRight: spacing.small,
  },
  radioSelected: { backgroundColor: colors.primary },
  radioLabel: { fontSize: fontSizes.medium, color: colors.text },

  // Button container
  buttonContainer: { flexDirection: 'row', marginTop: spacing.large },
});

export default CompanyInfo;
