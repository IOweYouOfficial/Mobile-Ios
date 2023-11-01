import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import InputWithIconFeatherComponent from '../../Components/GeneralComponents/InputWithFeatherIcon';
import {UserContext} from '../../Context/UserContext';
import {auth, checkForValidUsername} from '../../Utils/Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const {profileUsername, setProfileUsername} = useContext(UserContext);
  const {profileEmail, setProfileEmail} = useContext(UserContext);
  const {profilePassword, setProfilePassword} = useContext(UserContext);
  const {profileVerify, setProfileVerify} = useContext(UserContext);

  const [validUsernameChar, setValidUsernameChar] = useState(false);
  const [validUsernameAvailable, setValidUsernameAvailable] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [validPasswordVerify, setValidPasswordVerify] = useState(false);
  const [validPasswordLength, setValidPasswordLength] = useState(false);
  const [validPasswordCapital, setValidPasswordCapital] = useState(false);
  const [validPasswordSpecial, setValidPasswordSpecial] = useState(false);

  useEffect(() => {
    validateInformation();
  }, [profileEmail, profileUsername, profilePassword, profileVerify]);

  const validateInformation = () => {
    const usernameRegex = /^[a-zA-Z0-9_]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordLengthRegex = /^.{8,16}$/;
    const passwordCharRegex = /[A-Z]/;
    const passwordSpecialRegex = /[!@#$%^&*]/;

    profileUsername.match(usernameRegex)
      ? setValidUsernameChar(true)
      : setValidUsernameChar(false);

    profileEmail.match(emailRegex) ? setValidEmail(true) : setValidEmail(false);

    profilePassword === profileVerify
      ? setValidPasswordVerify(true)
      : setValidPasswordVerify(false);
    profilePassword.match(passwordLengthRegex)
      ? setValidPasswordLength(true)
      : setValidPasswordLength(false);
    profilePassword.match(passwordCharRegex)
      ? setValidPasswordCapital(true)
      : setValidPasswordCapital(false);
    profilePassword.match(passwordSpecialRegex)
      ? setValidPasswordSpecial(true)
      : setValidPasswordSpecial(false);

    checkForValidUsername(profileUsername)
      .then(response => {
        response === true
          ? setValidUsernameAvailable(true)
          : setValidUsernameAvailable(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const goToProfileNameScreen = () => {
    validEmail &&
    validPasswordCapital &&
    validPasswordLength &&
    validPasswordSpecial &&
    validPasswordVerify &&
    validUsernameAvailable &&
    validUsernameChar
      ? createUserProfile()
      : null;
  };

  const createUserProfile = () => {
    createUserWithEmailAndPassword(auth, profileEmail, profilePassword)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('ProfileSetupScreen');
      })
      .catch(error => {
        error.errorCode === 'auth/email-already-in-use'
          ? Alert.alert('Email is already in use.')
          : console.error(error);
      });
  };

  return (
    <View>
      <Text>Signup Screen</Text>
      <InputWithIconFeatherComponent
        label={'Username'}
        iconName={'user'}
        setValue={profileUsername}
        updateValue={setProfileUsername}
        placeholder={'Username'}
        secure={false}
      />
      {validUsernameChar ? null : <Text>Username: A-Z, a-z, 0-9, (_)</Text>}
      {validUsernameAvailable ? (
        <Text>Username: available</Text>
      ) : (
        <Text>Username: not available</Text>
      )}
      <InputWithIconFeatherComponent
        label={'Email'}
        iconName={'mail'}
        setValue={profileEmail}
        updateValue={setProfileEmail}
        placeholder={'example@gmail.com'}
        secure={false}
      />
      {validEmail ? null : <Text>Please enter valid email</Text>}
      <InputWithIconFeatherComponent
        label={'Password'}
        iconName={'lock'}
        setValue={profilePassword}
        updateValue={setProfilePassword}
        placeholder={'Password'}
        secure={true}
      />
      <InputWithIconFeatherComponent
        label={'Verify Password'}
        iconName={'lock'}
        setValue={profileVerify}
        updateValue={setProfileVerify}
        placeholder={'Verify Password'}
        secure={true}
      />
      {validPasswordVerify ? null : (
        <Text>Password and Verify don't match</Text>
      )}
      {validPasswordLength ? null : <Text>Password: 8 - 16 characters</Text>}
      {validPasswordCapital ? null : (
        <Text>Password: must contain a capital letter</Text>
      )}
      {validPasswordSpecial ? null : (
        <Text>Password: must contain a special char (!@#$%&*)</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          goToProfileNameScreen();
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
