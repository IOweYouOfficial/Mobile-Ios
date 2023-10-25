import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import {UserContextProvider} from './src/Context/UserContext';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserContextProvider>
        <BottomTabNavigation />
      </UserContextProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
