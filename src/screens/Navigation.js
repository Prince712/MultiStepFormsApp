import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import PersonalInfo from './PersonalInfo';
import CompanyInfo from './CompanyInfo';
import PlanSelection from './PlanSelection';
import SubmissionList from './SubmissionList';

const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="PersonalInfo"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="CompanyInfo" component={CompanyInfo} />
      <Stack.Screen name="PlanSelection" component={PlanSelection} />
      <Stack.Screen name="SubmissionList" component={SubmissionList} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
