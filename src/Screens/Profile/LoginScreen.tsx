import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import InputWithIconFeatherComponent from '../../Components/GeneralComponents/InputWithFeatherIcon';
import {UserContext} from '../../Context/UserContext';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const {loginUsername, setLoginUsername} = useContext(UserContext);
  const {loginPassword, setLoginPassword} = useContext(UserContext);

  return (
    <View>
      <Text>Login Screen</Text>
      <InputWithIconFeatherComponent
        label={'Username'}
        iconName={'user'}
        setValue={loginUsername}
        updateValue={setLoginUsername}
        placeholder={'Username'}
        secure={false}
      />
      <InputWithIconFeatherComponent
        label={'Password'}
        iconName={'lock'}
        setValue={loginPassword}
        updateValue={setLoginPassword}
        placeholder={'Password'}
        secure={true}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignupProfileScreen');
        }}>
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

interface UserContextType {
  loginUsername: string;
  loginPassword: string;
  setLoginUsername: string;
  setLoginPassword: string;
}

export default LoginScreen;
