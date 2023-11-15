import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import OpenAI from 'openai';
import {OPEN_AI_API_KEY} from '../../Utils/Authentication';

const openai = new OpenAI({apiKey: OPEN_AI_API_KEY});

export const NewTransactionScreen = () => {
  const [preprocessedImage, setPreprocessedImage] = useState('');
  const [galleryPermission, setGalleryPermission] = useState(
    ImagePicker.useMediaLibraryPermissions(),
  );
  const [cameraPermission, setCameraPermission] = useState(
    ImagePicker.useCameraPermissions(),
  );

  const grantLibraryAccess = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(response => {
      setGalleryPermission(response.status === 'granted');
    });
  };

  const grantCameraAccess = () => {
    ImagePicker.requestCameraPermissionsAsync().then(response => {
      setCameraPermission(response.status === 'granted');
    });
  };

  const processLibraryImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    })
      .then(result => {
        if (!result.canceled) {
          console.log(result);
          return ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{resize: {width: 800, height: 1000}}],
            {compress: 1, format: ImageManipulator.SaveFormat.JPEG},
          );
        }
      })
      .then(manipulatedImage => {
        if (manipulatedImage) {
          console.log(manipulatedImage);
          setPreprocessedImage(manipulatedImage.uri);
        }
      })
      .catch(error => {
        console.error('Error picking or manipulating image:', error);
      });
  };

  const processCameraImage = () => {
    ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    })
      .then(result => {
        if (!result.canceled) {
          console.log(result);
          return ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{resize: {width: 800, height: 1000}}],
            {compress: 1, format: ImageManipulator.SaveFormat.JPEG},
          );
        }
      })
      .then(manipulatedImage => {
        if (manipulatedImage) {
          console.log(manipulatedImage);
          setPreprocessedImage(manipulatedImage.uri);
        }
      })
      .catch(error => {
        console.error('Error picking or manipulating image:', error);
      });
  };

  const performOCR = () => {
    console.log('about to perform ocr');
    openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {type: 'text', text: 'What’s in this image?'},
              {
                type: 'image_url',
                image_url: {
                  url: preprocessedImage,
                },
              },
            ],
          },
        ],
      })
      .then(response => {
        console.log(response.choices[0]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View>
      <Text>Add new transaction: options below</Text>
      {cameraPermission ? (
        <TouchableOpacity
          onPress={() => {
            processCameraImage();
          }}>
          <Text>Camera</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            grantCameraAccess();
          }}>
          <Text>Grant Camera Access</Text>
        </TouchableOpacity>
      )}
      {galleryPermission ? (
        <TouchableOpacity
          onPress={() => {
            processLibraryImage();
          }}>
          <Text>Photo Library</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            grantLibraryAccess();
          }}>
          <Text>Grant Camera Access</Text>
        </TouchableOpacity>
      )}
      {preprocessedImage ? (
        <Image
          style={{width: 320, height: 400, margin: 10}}
          source={{uri: preprocessedImage}}
        />
      ) : null}
      {preprocessedImage ? (
        <TouchableOpacity
          onPress={() => {
            performOCR();
          }}>
          <Text>Scan Receipt</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
