import React from 'react';
import store from './src/store';
import AppNavigator from './src/Router';
import {Provider} from 'react-redux';
import {StyleSheet, View} from 'react-native';

const App = () => {
    return (
        <View style={styles.container}>
            <Provider store={store}>
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
