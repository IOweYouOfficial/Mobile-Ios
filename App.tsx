import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import BottomTabNavigation from './src/Navigation/BottomTabNavigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BottomTabNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
