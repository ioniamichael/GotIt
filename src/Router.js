import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {LoginScreen} from './screens/auth/LoginScreen';
import {SignUpScreen} from './screens/auth/SignUpScreen';
import {SplashScreen} from './screens/SplashScreen';
import {HomeScreen} from './screens/main/HomeScreen';
import {EntryScreen} from './screens/auth/EntryScreen';
import {TaskDetailsScreen} from './screens/main/TaskDetailsScreen';
import {ProfileScreen} from './screens/main/ProfileScreen';
import {CreateTaskScreen} from './screens/main/CreateTaskScreen';
import {EditTaskScreen} from './screens/main/EditTaskScreen';
import {SearchScreen} from './screens/main/SearchScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from './constants/icons';
import layout from './constants/layout';
import assets from './constants/assets';
import colors from './constants/colors';


const headerDefaultOption = {
    headerShown: true,
    headerStyle: {
        backgroundColor: colors.WHITE,
        ...layout.shadowBase,
    },
    ...TransitionPresets.SlideFromRightIOS,
};

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
    EditTaskScreen,
    ProfileScreen,
}, {
    defaultNavigationOptions: headerDefaultOption,
});

const CreateStack = createStackNavigator({
    CreateTaskScreen,
}, {defaultNavigationOptions: headerDefaultOption});

const SearchStack = createStackNavigator({
    SearchScreen,
}, {defaultNavigationOptions: headerDefaultOption});

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
        Create: {
            screen: CreateStack,
            navigationOptions: {
                tabBarLabel: 'Create',
                tabBarIcon: () => (
                    <Image style={{width: 55, height: 55}}
                           source={assets.ADD_TASK_BUTTON}/>
                ),
            },
        },
        Search: {
            screen: SearchStack,
            navigationOptions: {
                tabBarLabel: 'Search',
                tabBarIcon: info => (
                    <Ionicons name={icons.ICON_SEARCH} size={layout.defaultIconSize} color={info.tintColor}/>
                ),
            },
        },
    },
    {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: colors.DARK_GREY,
            inactiveTintColor: '#bfbfbf',
            labelStyle: {
                ...layout.boldTextBase,
            },
            style: {
                ...layout.shadowBase,
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
