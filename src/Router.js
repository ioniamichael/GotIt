import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {LoginScreen} from './screens/auth/LoginScreen';
import {SignUpScreen} from './screens/auth/SignUpScreen';
import {SplashScreen} from './screens/SplashScreen';
import {HomeScreen} from './screens/main/HomeScreen';
import {EntryScreen} from './screens/auth/EntryScreen';

const AuthStack = createStackNavigator({
    EntryScreen,
    LoginScreen,
    SignUpScreen,
}, {
    defaultNavigationOptions:{
        headerShown: false
    }
});

const HomeStack = createStackNavigator({
    HomeScreen,
});

const AppNavigator = createSwitchNavigator(
    {
        AuthStack,
        HomeStack,
    },
);

export default createAppContainer(AppNavigator);
