import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TaskList} from '../../components/Task/TaskList';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/AppHeaderButtons';
import {NoTasksPlaceHolder} from '../../components/Loaders/NoTasksPlaceholder';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import icons from '../../constants/icons';
import assets from '../../constants/assets';
import screens from '../../constants/screens';
import {useSelector} from "react-redux";


export const HomeScreen = ({navigation}) => {

    const tasks = useSelector(state => state.GeneralReducer.taskList);

    const onTaskPressHandler = (task) => {
        navigation.navigate(screens.TASK_DETAILS_SCREEN, {task});
    };

    return (
        <View style={styles.container}>
            {tasks
                ? <TaskList data={tasks} onTaskPress={onTaskPressHandler}/>
            : <NoTasksPlaceHolder/>}
        </View>
    );
};

HomeScreen.navigationOptions = ({navigation}) => ({
    headerTitle: () => {
        return (
            <View style={{marginStart: -20}}>
                <Image source={assets.APP_LOGO} style={{width: 90, height: 40}} />
            </View>
        );
    },
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButtons}>
            <Item
                onPress={
                    () => navigation.navigate(screens.NOTIFICATIONS_SCREEN)
                }
                title={'NOTIFICATION'}
                iconName={icons.ICON_NOTIFICATION}/>
        </HeaderButtons>
    ),
});

const styles = StyleSheet.create({
    headerTitle: {
        ...layout.boldTextBase,
    },
    container: {
        flex: 1,
        paddingHorizontal: layout.defaultPaddingSize,
        backgroundColor: color.WHITE,
    },
    overlay: {
        position: 'absolute',
        width: layout.width,
        height: layout.height,
        backgroundColor: '#00000099',
    },
});
