import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {LoginScreen} from './screens/auth/LoginScreen';
import {SignUpScreen} from './screens/auth/SignUpScreen';
import {SplashScreen} from './screens/SplashScreen';
import {HomeScreen} from './screens/main/HomeScreen';

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
