import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import InputWithIconFeatherComponent from '../../../Components/GeneralComponents/InputWithFeatherIcon';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../Context/UserContext';

const ProfileLocaitonScreen = () => {
  const navigation = useNavigation();

  const {profileLocation, setProfileLocation} = useContext(UserContext);

  return (
    <View>
      <Text>Location Screen</Text>
      <InputWithIconFeatherComponent
        label={'Location: (City, State)'}
        iconName={'map-pin'}
        setValue={profileLocation}
        updateValue={setProfileLocation}
        placeholder={'Los Angeles, CA'}
        secure={false}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProfilePictureScreen');
        }}>
        <Text>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileLocaitonScreen;
