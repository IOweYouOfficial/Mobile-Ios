/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScanScreen from '../Screens/Scan/ScanScreen';
import AccountScreen from '../Screens/Account/AccountScreen';
import ActivityScreen from '../Screens/Activity/ActivityScreen';
import ProfileStackNavigation from './ProfileStackNavigation';

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  const [platformType, setPlatformType] = useState('Phone');
  const [modelType, setModelType] = useState('iOS');

  useEffect(() => {
    determineDeviceType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const determineDeviceType = () => {
    Platform.OS === 'ios'
      ? Platform.isPad
        ? setPlatformType('Tablet')
        : setPlatformType('Phone')
      : setModelType('Android');
    console.log(modelType);
  };

  const phoneNavigation = () => {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          key="Home"
          component={ScanScreen}
          options={{
            tabBarShowLabel: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            // tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />),
          }}/>
        <Tab.Screen
          name="Account"
          key="Account"
          component={AccountScreen}
          options={{
            tabBarShowLabel: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            // tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />),
          }}/>
        <Tab.Screen
          name="Activity"
          key="Activity"
          component={ActivityScreen}
          options={{
            tabBarShowLabel: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            // tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />),
          }}/>
        <Tab.Screen
          name="Profile"
          key="Profile"
          component={ProfileStackNavigation}
          options={{
            tabBarShowLabel: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            // tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />),
          }}/>
      </Tab.Navigator>
    );
  };

  const tabletNavigation = () => {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          key="Home"
          component={ScanScreen}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />),
          }}/>
        <Tab.Screen
          name="Account"
          key="Account"
          component={AccountScreen}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />),
          }}/>
        <Tab.Screen
          name="Activity"
          key="Activity"
          component={ActivityScreen}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />),
          }}/>
        <Tab.Screen
          name="Profile"
          key="Profile"
          component={ProfileStackNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />),
          }}/>
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {
        modelType === 'ios' ? platformType === 'Tablet' ? tabletNavigation() : phoneNavigation() : phoneNavigation()
      }
    </NavigationContainer>
  );
};

export default BottomTabNavigation;
