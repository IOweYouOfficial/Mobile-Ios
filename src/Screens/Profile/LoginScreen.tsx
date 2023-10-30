import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import InputWithIconFeatherComponent from '../../Components/GeneralComponents/InputWithFeatherIcon';
import {UserContext} from '../../Context/UserContext';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../Utils/Firebase';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const {loginUsername, setLoginUsername} = useContext(UserContext);
  const {loginPassword, setLoginPassword} = useContext(UserContext);

  const loginUser = (): void => {
    signInWithEmailAndPassword(auth, loginUsername, loginPassword)
      .then(credentials => {
        console.log(credentials);
        setLoginUsername('');
        setLoginPassword('');
        navigation.navigate('ProfileScreen');
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Email / Password \n don't match our records");
      });
  };

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
          loginUser();
        }}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignupProfileScreen');
        }}>
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
