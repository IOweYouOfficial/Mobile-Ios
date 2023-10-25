import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Profile/LoginScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SignUpScreen from '../Screens/Profile/SignUpScreen';
import ProfilePhoneScreen from '../Screens/Profile/ProfileSetup/ProfilePhoneScreen';
import ProfilePictureScreen from '../Screens/Profile/ProfileSetup/ProfilePictureScreen';
import ProfileLocaitonScreen from '../Screens/Profile/ProfileSetup/ProfileLocaitonScreen';

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
        name="ProfileLocationScreen"
        component={ProfileLocaitonScreen}
      />
      <StackNav.Screen
        name="ProfilePhoneScreen"
        component={ProfilePhoneScreen}
      />
      <StackNav.Screen
        name="ProfilePictureScreen"
        component={ProfilePictureScreen}
      />
    </StackNav.Navigator>
  );
};

export default ProfileStackNavigation;
