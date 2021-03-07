import React from 'react';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {LoginScreen} from './screens/auth/LoginScreen';
import {SignUpScreen} from './screens/auth/SignUpScreen';
import {SplashScreen} from './screens/SplashScreen';
import {HomeScreen} from './screens/main/HomeScreen';
import {EntryScreen} from './screens/auth/EntryScreen';
import {TaskDetailsScreen} from './screens/main/TaskDetailsScreen';
import {ProfileScreen} from './screens/main/ProfileScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from './constants/icons';
import layout from './constants/layout';

const AuthStack = createStackNavigator({
    EntryScreen,
    LoginScreen,
    SignUpScreen,
}, {
    defaultNavigationOptions: {
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
    },
});

const HomeStack = createStackNavigator({
    HomeScreen,
    TaskDetailsScreen,
}, {
    defaultNavigationOptions: {
        headerShown: true,
        ...TransitionPresets.SlideFromRightIOS,
    },
});

const ProfileStack = createStackNavigator({
    ProfileScreen,
}, {
    defaultNavigationOptions: {
        headerShown: true,
        ...TransitionPresets.SlideFromRightIOS,
    },
});


const BottomTabBar = createBottomTabNavigator({
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: info => (
                    <Ionicons name={icons.ICON_HOME} size={layout.defaultIconSize} color={info.tintColor}/>
                ),
            },
        },
        Profile: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: info => (
                    <Ionicons name={icons.ICON_PROFILE} size={layout.defaultIconSize} color={info.tintColor}/>
                ),
            },
        },
    },
    {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'black',
            inactiveTintColor: 'grey',
            labelStyle: {
                ...layout.boldTextBase,
            },
        },
    });

const AppNavigator = createSwitchNavigator(
    {
        SplashScreen,
        AuthStack,
        BottomTabBar,
    },
);

export default createAppContainer(AppNavigator);
