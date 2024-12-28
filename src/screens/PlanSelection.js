import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {savePlanInfo, addSubmission} from '../redux/formSlice';
import ProgressBar from '../components/ProgressBar';
import {colors, fontSizes, spacing} from '../styles/theme';

const PlanSelection = ({navigation}) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [planType, setPlanType] = useState('');
  const [planDuration, setPlanDuration] = useState('');
  const [userCount, setUserCount] = useState('');
  const personalInfo = useSelector(state => state.form.personalInfo || {});
  const companyInfo = useSelector(state => state.form.companyInfo || {});

  const pricing = {
    monthly: {Gold: 50, Titanium: 100},
    yearly: {Gold: 500, Titanium: 1000},
  };

  const calculatePrice = () => {
    if (!planType || !planDuration) return 0;
    const pricePerUser = pricing[planDuration][planType];
    return pricePerUser * (userCount ? parseInt(userCount, 10) : 0);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate && selectedDate >= new Date()) {
      setStartDate(selectedDate);
    } else if (selectedDate < new Date()) {
      alert('You cannot select a past date.');
    }
  };

  const handleSubmit = () => {
    if (!startDate || !planType || !planDuration || !userCount) {
      alert('Please fill out all fields before proceeding.');
      return;
    }

    const formData = {
      startDate: startDate.toDateString(),
      planType,
      planDuration,
      userCount: parseInt(userCount, 10),
      totalPrice: calculatePrice(),
    };

    dispatch(savePlanInfo(formData));
    // Add submission to the submissions array
    const submissionData = {
      personalInfo,
      companyInfo,
      planInfo: formData,
    };
    dispatch(addSubmission(submissionData));
    navigation.navigate('SubmissionList');
  };

  return (
    <View style={styles.container}>
      {/* Fixed Progress Bar */}
      <View style={styles.progressBarContainer}>
        <ProgressBar step={3} totalSteps={3} />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Start Plan Date */}
        <Text style={styles.label}>Start Plan Date:</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>
            {startDate ? startDate.toDateString() : 'Select a date'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()} // Prevents selecting past dates
          />
        )}

        {/* Plan Type */}
        <Text style={styles.label}>Select Plan Type:</Text>
        <View style={styles.radioGroup}>
          {['Gold', 'Titanium'].map(type => (
            <TouchableOpacity
              key={type}
              style={styles.radioContainer}
              onPress={() => setPlanType(type)}>
              <View
                style={[
                  styles.radioCircle,
                  planType === type && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioLabel}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Plan Duration */}
        <Text style={styles.label}>Select Plan Duration:</Text>
        <View style={styles.radioGroup}>
          {['monthly', 'yearly'].map(duration => (
            <TouchableOpacity
              key={duration}
              style={styles.radioContainer}
              onPress={() => setPlanDuration(duration)}>
              <View
                style={[
                  styles.radioCircle,
                  planDuration === duration && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioLabel}>
                {duration.charAt(0).toUpperCase() + duration.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Number of Users */}
        <Text style={styles.label}>Number of Users:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => setUserCount(value)}
          value={userCount}
        />

        {/* Price Summary */}
        <Text style={styles.summary}>Total Price: ${calculatePrice()}</Text>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <View style={{flex: 1, marginRight: spacing.small}}>
            <Button
              title="Previous"
              color={colors.buttonDisabled}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={{flex: 1, marginLeft: spacing.small}}>
            <Button
              title="Submit"
              color={colors.primary}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  progressBarContainer: {
    padding: spacing.medium,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  formContainer: {padding: spacing.large, backgroundColor: colors.background},
  label: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: spacing.small,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: spacing.small,
    marginBottom: spacing.medium,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: spacing.small,
    marginBottom: spacing.medium,
    alignItems: 'center',
  },
  datePickerText: {fontSize: fontSizes.medium, color: colors.text},
  radioGroup: {marginBottom: spacing.medium},
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginRight: spacing.small,
  },
  radioSelected: {backgroundColor: colors.primary},
  radioLabel: {fontSize: fontSizes.medium, color: colors.text},
  summary: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginTop: spacing.large,
    color: colors.text,
  },
  buttonContainer: {flexDirection: 'row', marginTop: spacing.large},
});

export default PlanSelection;
