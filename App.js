import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, View,SafeAreaView, StatusBar} from 'react-native';
import store from './src/store';
import AppNavigator from './src/Router';
import colors from './src/constants/colors';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Provider store={store}>
                <StatusBar barStyle={'dark-content'} backgroundColor={colors.WHITE}/>
                <AppNavigator/>
            </Provider>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
