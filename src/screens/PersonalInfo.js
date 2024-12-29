import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {savePersonalInfo} from '../redux/formSlice';
import ProgressBar from '../components/ProgressBar';
import {colors, fontSizes, spacing} from '../styles/theme';

const PersonalInfo = ({navigation}) => {
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      companyWebsite: '',
      state: '',
      zipCode: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      companyName: Yup.string().required('Required'),
      companyWebsite: Yup.string().url('Invalid URL').required('Required'),
      state: Yup.string().required('Please select a state'),
      zipCode: Yup.string()
        .matches(/^\d{5}$/, 'Must be a valid 5-digit ZIP code')
        .required('Required'),
    }),
    onSubmit: values => {
      console.log('values', values);
      dispatch(savePersonalInfo(values));
      navigation.navigate('CompanyInfo');
    },
  });

  const getInputStyle = fieldName => [
    styles.input,
    focusedInput === fieldName && {borderColor: colors.primary},
    formik.touched[fieldName] &&
      formik.errors[fieldName] && {borderColor: colors.error},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          step={1}
          totalSteps={3}
          stepName={'Personal Information'}
        />
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={getInputStyle('firstName')}
          onChangeText={formik.handleChange('firstName')}
          onBlur={() => {
            formik.handleBlur('firstName');
            setFocusedInput(null);
          }}
          onFocus={() => setFocusedInput('firstName')}
          value={formik.values.firstName}
          placeholder="Enter First Name"
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <Text style={styles.error}>{formik.errors.firstName}</Text>
        )}

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={getInputStyle('lastName')}
          onChangeText={formik.handleChange('lastName')}
          onBlur={() => {
            formik.handleBlur('lastName');
            setFocusedInput(null);
          }}
          onFocus={() => setFocusedInput('lastName')}
          value={formik.values.lastName}
          placeholder="Enter Last Name"
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <Text style={styles.error}>{formik.errors.lastName}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={getInputStyle('email')}
          keyboardType="email-address"
          onChangeText={formik.handleChange('email')}
          onBlur={() => {
            formik.handleBlur('email');
            setFocusedInput(null);
          }}
          onFocus={() => setFocusedInput('email')}
          value={formik.values.email}
          placeholder="Enter Email Address"
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.error}>{formik.errors.email}</Text>
        )}

        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={getInputStyle('companyName')}
          onChangeText={formik.handleChange('companyName')}
          onBlur={() => {
            formik.handleBlur('companyName');
            setFocusedInput(null);
          }}
          onFocus={() => setFocusedInput('companyName')}
          value={formik.values.companyName}
          placeholder="Enter Company Name"
        />
        {formik.touched.companyName && formik.errors.companyName && (
          <Text style={styles.error}>{formik.errors.companyName}</Text>
        )}

        <Text style={styles.label}>Company Website</Text>
        <TextInput
          style={getInputStyle('companyWebsite')}
          keyboardType="url"
          onChangeText={formik.handleChange('companyWebsite')}
          onBlur={() => {
            formik.handleBlur('companyWebsite');
            setFocusedInput(null);
          }}
          onFocus={() => setFocusedInput('companyWebsite')}
          value={formik.values.companyWebsite}
          placeholder="Enter Company Website"
        />
        {formik.touched.companyWebsite && formik.errors.companyWebsite && (
          <Text style={styles.error}>{formik.errors.companyWebsite}</Text>
        )}

        <Text style={styles.label}>State</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formik.values.state}
            onValueChange={itemValue =>
              formik.setFieldValue('state', itemValue)
            }>
            <Picker.Item label="Select a state" value="" />
            <Picker.Item label="California" value="California" />
            <Picker.Item label="Texas" value="Texas" />
            <Picker.Item label="New York" value="New York" />
            <Picker.Item label="Florida" value="Florida" />
            <Picker.Item label="Illinois" value="Illinois" />
          </Picker>
        </View>
        {formik.touched.state && formik.errors.state && (
          <Text style={styles.error}>{formik.errors.state}</Text>
        )}

        <Text style={styles.label}>ZIP Code</Text>
        <TextInput
          style={getInputStyle('zipCode')}
          keyboardType="numeric"
          maxLength={5}
          onChangeText={formik.handleChange('zipCode')}
          onBlur={() => {
            formik.handleBlur('zipCode');
            setFocusedInput(null);
          }}
          onFocus={() => setFocusedInput('zipCode')}
          value={formik.values.zipCode}
          placeholder="Enter ZIP Code"
        />
        {formik.touched.zipCode && formik.errors.zipCode && (
          <Text style={styles.error}>{formik.errors.zipCode}</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            color={colors.primary}
            onPress={formik.handleSubmit}
          />
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginBottom: spacing.medium,
    overflow: 'hidden',
  },
  error: {
    color: colors.error,
    fontSize: fontSizes.small,
    marginTop: fontSizes.minus,
    marginBottom: fontSizes.small,
  },

  buttonContainer: {marginTop: spacing.large},
});

export default PersonalInfo;
