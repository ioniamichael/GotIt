import React from 'react';
import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import {deleteTask, fetchTasks, setShowQuickActionsModal} from '../../store/actions/GeneralActions';
import {removeTaskFromDB, setTaskAsFinished} from '../../services/userService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../constants/colors';
import icons from '../../constants/icons';
import {useDispatch} from "react-redux";


export const TasksQuickActions = ({task}) => {

    const dispatch = useDispatch();

    const openTaskDetailsScreen = () => {

    };

    const deleteSelectedTask = async ()  => {
        try {
            await removeTaskFromDB(task.taskCreationDate);
            await dispatch(deleteTask(task.taskCreationDate));
            await dispatch(fetchTasks());
        } catch (e) {
            console.log(e);
        }
    };

    const checkThisTaskAsFinished = async () => {
        await setTaskAsFinished(task);
        await dispatch(fetchTasks());
    };

    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={openTaskDetailsScreen}>
                    <Ionicons name={icons.ICON_INFO} size={18} color={color.BLACK}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={checkThisTaskAsFinished}>
                    <Ionicons name={icons.ICON_TASK_DONE} size={18} color={color.BLACK}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteSelectedTask}>
                    <Ionicons name={icons.ICON_TRASH} size={18} color={color.BLACK}/>
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});
