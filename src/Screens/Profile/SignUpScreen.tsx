import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import InputWithIconFeatherComponent from '../../Components/GeneralComponents/InputWithFeatherIcon';
import {UserContext} from '../../Context/UserContext';

// label, iconName, setValue, updateValue, placeholder, secure

const SignUpScreen = () => {
  const navigation = useNavigation();

  const {ProfileUsername, setProfileUsername} = useContext(UserContext);
  const {ProfileEmail, setProfileEmail} = useContext(UserContext);
  const {ProfilePassword, setProfilePassword} = useContext(UserContext);
  const {ProfileVerify, setProfileVerify} = useContext(UserContext);

  return (
    <View>
      <Text>Signup Screen</Text>
      <InputWithIconFeatherComponent
        label={'Username'}
        iconName={'user'}
        setValue={ProfileUsername}
        updateValue={setProfileUsername}
        placeholder={'Username'}
        secure={false}
      />
      <InputWithIconFeatherComponent
        label={'Email'}
        iconName={'mail'}
        setValue={ProfileEmail}
        updateValue={setProfileEmail}
        placeholder={'example@gmail.com'}
        secure={false}
      />
      <InputWithIconFeatherComponent
        label={'Password'}
        iconName={'lock'}
        setValue={ProfilePassword}
        updateValue={setProfilePassword}
        placeholder={'Password'}
        secure={true}
      />
      <InputWithIconFeatherComponent
        label={'Verify Password'}
        iconName={'lock'}
        setValue={ProfileVerify}
        updateValue={setProfileVerify}
        placeholder={'Verify Password'}
        secure={true}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProfileNameScreen')
        }}>
        <Text>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LoginProfileScreen');
        }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
