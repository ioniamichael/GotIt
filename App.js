import React from 'react';
import {Modal,Text} from 'react-native';
import {Provider} from 'react-redux';
import {StyleSheet, UIManager, View, StatusBar} from 'react-native';
import store from './src/store';
import AppNavigator from './src/Router';
import colors from './src/constants/colors';


if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const App = () => {
    //TODO implement Modal POP UP with error to all try catch methods.
    return (
        <View style={styles.container}>
            <Provider store={store}>
                <StatusBar barStyle={'dark-content'} backgroundColor={colors.WHITE}/>
                <AppNavigator/>
            </Provider>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
