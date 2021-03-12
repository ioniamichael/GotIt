import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TaskList} from '../../components/Task/TaskList';
import {setShowQuickActionsModal} from '../../store/actions/GeneralActions';
import {QuickActions} from '../../components/Task/QuickActions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/AppHeaderButtons';
import {NoTasksPlaceHolder} from '../../components/NoTasksPlaceholder';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import icons from '../../constants/icons';
import assets from '../../constants/assets';
import screens from '../../constants/screens';


export const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.GeneralReducer.taskList);
    const isQuickActionsModalVisible = useSelector(state => state.GeneralReducer.isQuickActionsModalVisible);
    const isCreateTaskModalVisible = useSelector(state => state.GeneralReducer.isCreateTaskModalVisible);
    const [quickActionsTask, setQuickActionsTask] = useState({});

    const onTaskPressHandler = (task) => {
        navigation.navigate(screens.TASK_DETAILS_SCREEN, {task});
    };

    const openQuickActionsModal = (task) => {
        setQuickActionsTask(task);
        dispatch(setShowQuickActionsModal(true));
    };

    return (
        <View style={styles.container}>
            {!tasks.length && <NoTasksPlaceHolder/>}
            <TaskList data={tasks} onTaskPress={onTaskPressHandler} onTaskLongPress={openQuickActionsModal}/>
            <QuickActions isVisible={isQuickActionsModalVisible} task={quickActionsTask} navigation={navigation}/>
            {isQuickActionsModalVisible || isCreateTaskModalVisible && <View style={styles.overlay}/>}
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
