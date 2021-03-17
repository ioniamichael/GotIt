import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import {deleteTask, fetchTasks, setShowQuickActionsModal} from '../../store/actions/GeneralActions';
import {removeTaskFromDB, setTaskAsFinished} from '../../services/userService';
import {useDispatch, useSelector} from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../constants/colors';
import icons from '../../constants/icons';
import layout from '../../constants/layout';

export const TasksQuickActions = ({task}) => {

    const dispatch = useDispatch();
    const isQuickActionsShown = useSelector(state => state.GeneralReducer.isQuickActionsModalVisible);

    const expandAnim = new Animated.Value(isQuickActionsShown ? 0 : 1);

    useEffect(() => {
        Animated.spring(
            expandAnim,
            {
                toValue: isQuickActionsShown ? 1 : 0,
                friction: 4,
                tension: 140,
                useNativeDriver: true
            }
        ).start();
    }, [isQuickActionsShown]);

    const expand = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    const openTaskDetailsScreen = () => {
        dispatch(setShowQuickActionsModal(false));
    };

    const deleteSelectedTask = async () => {
        try {
            await removeTaskFromDB(task.taskCreationDate);
            await dispatch(deleteTask(task.taskCreationDate));
            await dispatch(fetchTasks());
        } catch (e) {
            console.log(e);
        }
        dispatch(setShowQuickActionsModal(false));
    };

    const checkThisTaskAsFinished = async () => {
        try {
            await setTaskAsFinished(task);
            await dispatch(fetchTasks());
        } catch (e) {
            console.log(e)
        }
        dispatch(setShowQuickActionsModal(false));
    };

    return (
        <Animated.View style={[styles.container, {transform: [{scaleY: expand}]}]}>
            <TouchableOpacity style={styles.quickAction} onPress={openTaskDetailsScreen}>
                <Ionicons name={icons.ICON_INFO} size={18} color={color.BLACK}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={checkThisTaskAsFinished}>
                <Ionicons name={icons.ICON_TASK_DONE} size={18} color={color.BLACK}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={deleteSelectedTask}>
                <Ionicons name={icons.ICON_TRASH} size={18} color={color.BLACK}/>
            </TouchableOpacity>
        </Animated.View>
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
