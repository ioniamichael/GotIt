import React from 'react';
import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import {deleteTask, fetchTasks, setShowQuickActionsModal} from '../../store/actions/GeneralActions';
import {removeTaskFromDB, setTaskAsFinished} from '../../services/userService';
import {useDispatch} from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../constants/colors';
import icons from '../../constants/icons';
import layout from '../../constants/layout';

export const TasksQuickActions = ({task}) => {

    const dispatch = useDispatch();

    const openTaskDetailsScreen = () => {

    };

    const deleteSelectedTask = async () => {
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
            <TouchableOpacity style={styles.quickAction} onPress={openTaskDetailsScreen}>
                <Ionicons name={icons.ICON_INFO} size={18} color={color.BLACK}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={checkThisTaskAsFinished}>
                <Ionicons name={icons.ICON_TASK_DONE} size={18} color={color.BLACK}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={deleteSelectedTask}>
                <Ionicons name={icons.ICON_TRASH} size={18} color={color.BLACK}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    quickAction: {
        ...layout.shadowBase,
        backgroundColor: color.GREY,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    }
});
