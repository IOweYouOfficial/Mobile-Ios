import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, View, Image, ScrollView} from 'react-native';
import InputWithIconFeatherComponent from '../../Components/GeneralComponents/InputWithFeatherIcon';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../Context/UserContext';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { auth, db, uploadNewImage } from '../../Utils/Firebase';
import { addDoc, collection } from 'firebase/firestore';

const ProfileSetupScreen = () => {
  const navigation = useNavigation();

  const {profileFirstName, setProfileFirstName} = useContext(UserContext);
  const {profileLastName, setProfileLastName} = useContext(UserContext);
  const {profileLocation, setProfileLocation} = useContext(UserContext);
  const {profilePhone, setProfilePhone} = useContext(UserContext);
  const {profilePicture, setProfilePicture} = useContext(UserContext);
  const {profileUsername, setProfileUsername} = useContext(UserContext);
  const {profileEmail, setProfileEmail} = useContext(UserContext);
  const {setProfilePassword, setProfileVerify} = useContext(UserContext);

  const [hasPermission, setHasPermission] = useState<Boolean>(false);

  const pickImage = (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(galleryStatus.status === 'granted');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const pickDirectImage = () => {
    pickImage()
      .then(() => {
        return ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      })
      .then(result => {
        if (!result.canceled) {
          console.log(result);
          return ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{resize: {width: 800, height: 800}}],
            {compress: 1, format: ImageManipulator.SaveFormat.JPEG},
          );
        }
      })
      .then(manipulatedImage => {
        if (manipulatedImage) {
          console.log(manipulatedImage);
          setProfilePicture(manipulatedImage.uri);
        }
      })
      .catch(error => {
        console.error('Error picking or manipulating image:', error);
      });
  };

  const handleImageUpload = () => {
    const filename = `${auth.currentUser.uid}`;
    console.log(`profile picture uri: ${profilePicture}`);
    uploadNewImage(profilePicture, filename)
      .then(downloadableUrl => {
        console.log('received downloadable url');
        if (downloadableUrl) {
          createUserProfile(downloadableUrl);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const createUserProfile = (uri: string) => {
    const colRef = collection(db, 'Profiles');
    addDoc(colRef, {
      userId: auth.currentUser.uid,
      fullName: profileFirstName + ' ' + profileLastName,
      firstName: profileFirstName,
      lastName: profileLastName,
      email: profileEmail,
      username: profileUsername,
      phone: profilePhone,
      location: profileLocation,
      picture: uri,
    })
      .then(response => {
        setProfileEmail('');
        setProfileFirstName('');
        setProfileLastName('');
        setProfileLocation('');
        setProfilePassword('');
        setProfileVerify('');
        setProfilePhone('');
        setProfileUsername('');
        setProfilePicture('');
        navigation.navigate('ProfileScreen');
      })
      .catch(errpr => {
        console.log(errpr);
      });
  };

  return (
    <ScrollView>
      <Text>Profile Name Screen</Text>
      <TouchableOpacity onPress={() => pickDirectImage()}>
        <Text>Select Profile Picture</Text>
      </TouchableOpacity>
      {profilePicture ? (
        <Image
          style={{width: 100, height: 100, margin: 10}}
          source={{uri: profilePicture}}
        />
      ) : (
        <View
          style={{
            width: 100,
            height: 100,
            margin: 10,
            backgroundColor: 'lightgrey',
          }}></View>
      )}
      <TouchableOpacity onPress={() => removeProfilePicture()}>
        <Text>Remove Profile Picture</Text>
      </TouchableOpacity>
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
      <InputWithIconFeatherComponent
        label={'Location: (City, State)'}
        iconName={'user'}
        setValue={profileLocation}
        updateValue={setProfileLocation}
        placeholder={'Los Angeles, CA'}
        secure={false}
      />
      <InputWithIconFeatherComponent
        label={'Phone'}
        iconName={'user'}
        setValue={profilePhone}
        updateValue={setProfilePhone}
        placeholder={'123-456-7890'}
        secure={false}
      />
      <View>
        <TouchableOpacity
          onPress={() => {
            handleImageUpload();
          }}>
          <Text>Complete Setup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileSetupScreen;
