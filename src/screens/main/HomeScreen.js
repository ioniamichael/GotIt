import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {TaskList} from '../../components/TaskList';
import {CreateTaskModal} from '../../components/CreateTaskModal';
import {setShowCreateTaskModal, setShowQuickActionsModal} from '../../store/actions/GeneralActions';
import {QuickActions} from '../../components/QuickActions';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../constants/colors';
import layout from '../../constants/layout';

export const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.UserReducer.userDetails);
    const tasks = useSelector(state => state.GeneralReducer.taskList);
    const isCreateTaskModalVisible = useSelector(state => state.GeneralReducer.isCreateTaskModalVisible);
    const isQuickActionsModalVisible = useSelector(state => state.GeneralReducer.isQuickActionsModalVisible);

    const [quickActionsTask, setQuickActionsTask] = useState({});

    const onTaskPressHandler = (task) => {
        navigation.navigate('TaskDetailsScreen', {task});
    };

    const openCreateTaskModal = () => {
        dispatch(setShowCreateTaskModal(true));
    };

    const openQuickActionsModal = (data) => {
        setQuickActionsTask(data);
        dispatch(setShowQuickActionsModal(true));
    };

    return (
        <View style={styles.container}>
            <Button title={'create'} onPress={openCreateTaskModal}/>
            <TaskList data={tasks} onTaskPress={onTaskPressHandler} onTaskLongPress={openQuickActionsModal}/>
            <CreateTaskModal isVisible={isCreateTaskModalVisible}/>
            <QuickActions isVisible={isQuickActionsModalVisible} data={quickActionsTask} navigation={navigation}/>
            {isCreateTaskModalVisible || isQuickActionsModalVisible && <View style={styles.overlay}/>}
        </View>
    );
};

const styles = StyleSheet.create({
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
