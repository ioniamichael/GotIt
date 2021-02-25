import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {Provider} from 'react-redux';
import store from './src/store';
import {SplashScreen} from './src/screens/SplashScreen';

const App = () => {
  return (
      <View style={styles.container}>
        <Provider store={store}>
          <SplashScreen/>
        </Provider>
      </View>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
