import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {LoginScreen} from './screens/LoginScreen';
import {SignUpScreen} from './screens/SignUpScreen';
import {SplashScreen} from './screens/SplashScreen';
import {HomeScreen} from './screens/HomeScreen';

const AuthStack = createStackNavigator({
    LoginScreen,
    SignUpScreen,
});

const HomeStack = createStackNavigator({
    HomeScreen,
});

const AppNavigator = createSwitchNavigator(
    {
        SplashScreen,
        AuthStack,
        HomeStack,
    },
);

export default createAppContainer(AppNavigator);
