import React, {useContext, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../Context/UserContext';

import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db, uploadNewImage} from '../../../Utils/Firebase';
import {addDoc, collection} from 'firebase/firestore';

const ProfilePictureScreen = () => {
  const navigation = useNavigation();

  const userContext = useContext(UserContext);
  const {profilePicture, setProfilePicture} = userContext;
  const {
    profileEmail,
    setProfileEmail,
    profilePassword,
    setProfilePassword,
    profileFirstName,
    setProfileFirstName,
    profileLastName,
    setProfileLastName,
    profileUsername,
    setProfileUsername,
    profilePhone,
    setProfilePhone,
    profileLocation,
    setProfileLocation,
  } = userContext;

  const [hasPermission, setHasPermission] = useState<Boolean>(false);
  const [loggedInUserId, setLoggedInUserId] = useState<String>('');

  const createUserAccount = (): void => {
    createUserWithEmailAndPassword(auth, profileEmail, profilePassword)
      .then(userCredential => {
        const user = userCredential.user;
        setLoggedInUserId(user.uid);
        uploadImageToFirebase(user.uid)
          .then(downloadableUrl => {
            console.log('received downloadable url');
            if (downloadableUrl) {
              createUserProfile(loggedInUserId, downloadableUrl);
            }
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        error.errorCode === 'auth/email-already-in-use'
          ? Alert.alert('Email is already in use.')
          : null;
      });
  };

  const createUserProfile = (userId: String, url: string): void => {
    console.log('creating user profiel');
    console.log(userId);
    const colRef = collection(db, 'Profiles');
    addDoc(colRef, {
      userId: userId,
      fullName: profileFirstName + ' ' + profileLastName,
      firstName: profileFirstName,
      lastName: profileLastName,
      email: profileEmail,
      username: profileUsername,
      phone: profilePhone,
      location: profileLocation,
      picture: url,
    })
      .then(response => {
        setProfileEmail('');
        setProfileFirstName('');
        setProfileLastName('');
        setProfileLocation('');
        setProfilePassword('');
        setProfilePhone('');
        setProfileUsername('');
        setProfilePicture('');
        const newLocal = 'ProfileScreen';
        navigation.navigate(newLocal);
      })
      .catch(errpr => {
        console.log(errpr);
      });
  };

  const uploadImageToFirebase = (userId: string): Promise<string | null> => {
    const filename = `${userId}`;
    console.log(`profile picture uri: ${profilePicture}`)
    return uploadNewImage(profilePicture, filename);
  };

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
          return ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{ resize: { width: 800, height: 800 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
          );
        }
      })
      .then(manipulatedImage => {
        if (manipulatedImage) {
          console.log(manipulatedImage)
          setProfilePicture(manipulatedImage.uri)
        }
      })
      .catch(error => {
        console.error('Error picking or manipulating image:', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Text>Profile Picture Screen</Text>
      <TouchableOpacity onPress={() => pickDirectImage()}>
        <Text>Select Profile Picture</Text>
      </TouchableOpacity>
      {profilePicture ? (
        <Image
          style={{width: 100, height: 100, margin: 10}}
          source={{uri: profilePicture}}
        />
      ) : null}
      <Text>{profilePicture}</Text>
      <View>
        <TouchableOpacity
          onPress={() => {
            createUserAccount();
          }}>
          <Text>Submit</Text>
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

export default ProfilePictureScreen;
