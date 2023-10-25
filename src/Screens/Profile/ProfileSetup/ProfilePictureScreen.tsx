import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ProfilePictureScreen = () => {
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState('');
  const [hasPermission, setHasPermission] = useState(false);

  const pickImage = () => {
    (async function () {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(galleryStatus.status === 'granted');
    })();
  };

  const pickDirectImage = async () => {
    pickImage();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });
    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text>Profile Picture Screen</Text>
      <TouchableOpacity onPress={() => pickDirectImage()}>
        <Text>Select Profile Picture</Text>
        {profileImage ? (
          <Image
            style={{width: 100, height: 100, margin: 10}}
            source={{uri: profileImage}}
          />
        ) : null}
      </TouchableOpacity>
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
