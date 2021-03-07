import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {LoginScreen} from './screens/auth/LoginScreen';
import {SignUpScreen} from './screens/auth/SignUpScreen';
import {SplashScreen} from './screens/SplashScreen';
import {HomeScreen} from './screens/main/HomeScreen';
import {EntryScreen} from './screens/auth/EntryScreen';
import {TaskDetailsScreen} from './screens/main/TaskDetailsScreen';
import {ProfileScreen} from './screens/main/ProfileScreen';
import {AllTasksScreen} from './screens/main/AllTasksScreen';
import {SettingsScreen} from './screens/main/SettingsScreen';
import {SearchScreen} from './screens/main/SearchScreen';
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
    ProfileScreen
}, {
    defaultNavigationOptions: {
        headerShown: true,
        ...TransitionPresets.SlideFromRightIOS,
    },
});

const AllTasksStack = createStackNavigator({
    AllTasksScreen,
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
                    <Ionicons name={icons.HOME_ICON} size={layout.defaultIconSize} color={info.tintColor}/>
                ),
            },
        },
        AllTasks: {
            screen: AllTasksStack,
            navigationOptions: {
                tabBarLabel: 'AllTasks',
                tabBarIcon: info => (
                    <Ionicons name={icons.TASKS} size={layout.defaultIconSize} color={info.tintColor}/>
                ),
            },
        },
        Search: {
            screen: SearchScreen,
            navigationOptions: {
                tabBarLabel: 'AllTasks',
                tabBarIcon: info => (
                    <Ionicons name={icons.SEARCH} size={layout.defaultIconSize} color={info.tintColor}/>
                ),
            },
        },
        // Create: {
        //     screen: CreateTaskModal,
        //     navigationOptions:{
        //         tabBarIcon: () => (
        //             <Image style={{ width: 80, height: 80 }}
        //                    source={assets.ADD_TASK_BUTTON} />
        //         )
        //     }
        // },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: info => (
                    <Ionicons name={icons.SETTINGS_ICON} size={layout.defaultIconSize} color={info.tintColor}/>
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
