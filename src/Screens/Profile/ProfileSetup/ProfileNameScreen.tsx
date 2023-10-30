import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import InputWithIconFeatherComponent from '../../../Components/GeneralComponents/InputWithFeatherIcon';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../Context/UserContext';

const ProfileNameScreen = () => {
  const navigation = useNavigation();

  const {profileFirstName, setProfileFirstName} = useContext(UserContext);
  const {profileLastName, setProfileLastName} = useContext(UserContext);

  return (
    <View>
      <Text>Profile Name Screen</Text>
      <InputWithIconFeatherComponent
        label={'First Name'}
        iconName={'user'}
        setValue={profileFirstName}
        updateValue={setProfileFirstName}
        placeholder={'John'}
        secure={false}
      />
      <InputWithIconFeatherComponent
        label={'Last Name'}
        iconName={'user'}
        setValue={profileLastName}
        updateValue={setProfileLastName}
        placeholder={'Doe'}
        secure={false}
      />
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfilePhoneScreen');
          }}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileNameScreen;
