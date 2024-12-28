import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, fontSizes, spacing} from '../styles/theme';

const SubmissionList = () => {
  const submissions = useSelector(state => state.form.submissions);

  return (
    <View style={styles.container}>
      <Text style={styles.note}>
        This screen is for viewing purposes only. Your data has been saved
        successfully.
      </Text>

      {submissions.length === 0 ? (
        <Text style={styles.emptyText}>No submissions yet.</Text>
      ) : (
        <FlatList
          data={submissions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Submission Details</Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Name:</Text>{' '}
                {item.personalInfo.firstName} {item.personalInfo.lastName}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Email:</Text>{' '}
                {item.personalInfo.email}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Start Date:</Text>{' '}
                {item.planInfo.startDate}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Plan Type:</Text>{' '}
                {item.planInfo.planType}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Duration:</Text>{' '}
                {item.planInfo.planDuration}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Users:</Text>{' '}
                {item.planInfo.userCount}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Total Price:</Text> $
                {item.planInfo.totalPrice}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  note: {
    fontSize: fontSizes.medium,
    color: colors.primary,
    marginBottom: spacing.medium,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: fontSizes.large,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.large,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.buttonText,
    marginBottom: spacing.small,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  cardText: {
    fontSize: fontSizes.medium,
    color: colors.buttonText,
    marginBottom: spacing.small,
  },
  bold: {fontWeight: 'bold'},
});

export default SubmissionList;
