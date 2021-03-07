import React, {useState} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {TaskList} from '../../components/Task/TaskList';
import {setShowCreateTaskModal, setShowQuickActionsModal} from '../../store/actions/GeneralActions';
import {QuickActions} from '../../components/Task/QuickActions';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/AppHeaderButtons';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import icons from '../../constants/icons';
import {CreateTaskModal} from '../../components/Task/CreateTaskModal';

export const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.UserReducer.userDetails);
    const tasks = useSelector(state => state.GeneralReducer.taskList);
    const isQuickActionsModalVisible = useSelector(state => state.GeneralReducer.isQuickActionsModalVisible);
    const isCreateTaskModalVisible = useSelector(state => state.GeneralReducer.isCreateTaskModalVisible);

    const [quickActionsTask, setQuickActionsTask] = useState({});

    const onTaskPressHandler = (task) => {
        navigation.navigate('TaskDetailsScreen', {task});
    };

    const openQuickActionsModal = (data) => {
        setQuickActionsTask(data);
        dispatch(setShowQuickActionsModal(true));
    };

    return (
        <View style={styles.container}>
            <Button title={'create'} onPress={() => dispatch(setShowCreateTaskModal(true))}/>
            <TaskList data={tasks} onTaskPress={onTaskPressHandler} onTaskLongPress={openQuickActionsModal}/>
            <QuickActions isVisible={isQuickActionsModalVisible} data={quickActionsTask} navigation={navigation}/>
            <CreateTaskModal isVisible={isCreateTaskModalVisible}/>
            {isQuickActionsModalVisible || isCreateTaskModalVisible && <View style={styles.overlay}/>}
        </View>
    );
};

HomeScreen.navigationOptions = ({navigation}) => ({
    headerTitle: () => {
        return (
            <View>
                <Text style={styles.headerTitle}>GotIt</Text>
            </View>
        );
    },
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButtons}>
            <Item
                onPress={
                    () => navigation.navigate('NotificationsScreen')
                }
                title={'NOTIFICATION'}
                iconName={icons.NOTIFICATION_ICON}/>
        </HeaderButtons>
    ),
});

const styles = StyleSheet.create({
    headerTitle: {
        ...layout.boldTextBase,
    },
    container: {
        flex: 1,
        backgroundColor: color.WHITE,
    },
    overlay: {
        position: 'absolute',
        width: layout.width,
        height: layout.height,
        backgroundColor: '#00000099',
    },
});
