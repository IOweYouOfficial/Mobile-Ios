import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/Scan/HomeScreen';
import {NewTransactionScreen} from '../Screens/Scan/NewTransactionScreen';

const StackNav = createStackNavigator();

const HomeStackNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="HomeScreen" component={HomeScreen} />
      <StackNav.Screen
        name="NewTransactionScreen"
        component={NewTransactionScreen}
      />
    </StackNav.Navigator>
  );
};

export default HomeStackNavigation;
