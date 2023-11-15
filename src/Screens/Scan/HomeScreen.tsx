import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();


  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewTransactionScreen');
        }}>
        <Text>Add New Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
