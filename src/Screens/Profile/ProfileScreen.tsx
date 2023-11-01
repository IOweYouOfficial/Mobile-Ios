import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {auth, grabProfile} from '../../Utils/Firebase';
import {signOut} from 'firebase/auth';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useState({});

  useEffect(() => {
    console.log(auth.currentUser)
    if (auth.currentUser === null) {
      goToLogin();
    } else {
      getCurrentProfile();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      return auth.currentUser === null
        ? navigation.navigate('LoginProfileScreen')
        : getCurrentProfile();
    });
    return unsubscribe;
  }, [navigation]);

  const getCurrentProfile = () => {
    grabProfile(auth.currentUser.uid)
      .then(profile => {
        setProfile(profile);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const goToLogin = (): void => {
    const newLocal = 'LoginProfileScreen';
    navigation.navigate(newLocal);
  };

  const logoutUser = (): void => {
    signOut(auth)
      .then(() => {
        navigation.navigate('LoginProfileScreen');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <Text>{profile?.username}</Text>
      <Text>{profile?.fullName}</Text>
      <Text>{profile?.email}</Text>
      {profile && (
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{height: 100, width: 100, margin: 10}}
          source={{
            uri: profile?.picture,
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          logoutUser();
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
