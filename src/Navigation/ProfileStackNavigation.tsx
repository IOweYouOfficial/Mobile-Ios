import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SignUpScreen from '../Screens/Profile/SignUpScreen';
import LoginScreen from '../Screens/Profile/LoginScreen';
import ProfileSetupScreen from '../Screens/Profile/ProfileSetupScreen';

const StackNav = createStackNavigator();

const ProfileStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ProfileScreen" component={ProfileScreen} />
      <StackNav.Screen name="LoginProfileScreen" component={LoginScreen} />
      <StackNav.Screen name="SignupProfileScreen" component={SignUpScreen} />
      <StackNav.Screen
        name="ProfileSetupScreen"
        component={ProfileSetupScreen}
      />
    </StackNav.Navigator>
  );
};

export default ProfileStackNavigation;
