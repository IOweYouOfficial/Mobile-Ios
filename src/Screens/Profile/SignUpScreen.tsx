import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import InputWithIconFeatherComponent from '../../Components/GeneralComponents/InputWithFeatherIcon';

// label, iconName, setValue, updateValue, placeholder, secure

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');

  return (
    <View>
      <Text>Signup Screen</Text>
      <InputWithIconFeatherComponent
        label={'Username'}
        iconName={'user'}
        setValue={username}
        updateValue={setUsername}
        placeholder={'Username'}
        secure={false}
      />
      <InputWithIconFeatherComponent
        label={'Email'}
        iconName={'mail'}
        setValue={email}
        updateValue={setEmail}
        placeholder={'example@gmail.com'}
        secure={false}
      />
      <InputWithIconFeatherComponent
        label={'Password'}
        iconName={'lock'}
        setValue={password}
        updateValue={setPassword}
        placeholder={'Password'}
        secure={true}
      />
      <InputWithIconFeatherComponent
        label={'Verify Password'}
        iconName={'lock'}
        setValue={verify}
        updateValue={setVerify}
        placeholder={'Verify Password'}
        secure={true}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProfilePhoneScreen')
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
