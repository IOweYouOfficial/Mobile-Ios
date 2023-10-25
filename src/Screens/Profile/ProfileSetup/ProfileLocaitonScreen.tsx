import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import InputWithIconFeatherComponent from '../../../Components/GeneralComponents/InputWithFeatherIcon';
import {useNavigation} from '@react-navigation/native';

const ProfileLocaitonScreen = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState('');

  return (
    <View>
      <Text>Location Screen</Text>
      <InputWithIconFeatherComponent
        label={'Location: (City, State)'}
        iconName={'map-pin'}
        setValue={location}
        updateValue={setLocation}
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
