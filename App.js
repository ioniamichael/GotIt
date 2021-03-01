import React from 'react';
import store from './src/store';
import AppNavigator from './src/Router';
import {Provider} from 'react-redux';
import {StyleSheet, View, StatusBar} from 'react-native';
import colors from './src/constants/colors';

const App = () => {
    return (
        <View style={styles.container}>
            <Provider store={store}>
                <StatusBar barStyle={'dark-content'}/>
                <AppNavigator/>
            </Provider>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE
    },
});

export default App;
