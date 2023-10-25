import React from 'react';
import {Text, View} from 'react-native';
import {auth} from '../../Utils/Firebase';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  console.log(auth.currentUser);

  const goToLogin = () => {
    navigation.navigate('LoginProfileScreen');
  };

  const displayLoggedIn = () => {
    return (
      <View>
        <Text>Logged In</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      {auth.currentUser === null ? goToLogin() : displayLoggedIn()}
    </View>
  );
};

export default ProfileScreen;
