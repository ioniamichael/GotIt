import React from 'react';
import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import {deleteTask, fetchTasks, setShowQuickActionsModal} from '../../store/actions/GeneralActions';
import {removeTaskFromDB, setTaskAsFinished} from '../../services/userService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../constants/colors';
import {useDispatch} from 'react-redux';
import layout from '../../constants/layout';
import screens from '../../constants/screens';
import icons from '../../constants/icons';


export const QuickActions = ({isVisible, onPressActionButton, task, navigation}) => {

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(setShowQuickActionsModal(false));
    };

    const openTaskDetailsScreen = () => {
        navigation.navigate(screens.TASK_DETAILS_SCREEN, {task});
        closeModal()
    };

    const deleteSelectedTask = async ()  => {
        try {
            await removeTaskFromDB(task.taskCreationDate);
            await dispatch(deleteTask(task.taskCreationDate));
            await dispatch(fetchTasks());
            closeModal();
        } catch (e) {
            console.log(e);
        }
    };

    const checkThisTaskAsFinished = async () => {
        await setTaskAsFinished(task);
        await dispatch(fetchTasks());
        closeModal();
    };

    return (
        <Modal
            onRequestClose={() => closeModal()}
            visible={isVisible}
            animationType='slide'
            transparent>
            <View style={styles.container}>
                <TouchableOpacity onPress={openTaskDetailsScreen}>
                    <Ionicons name={icons.ICON_INFO} size={24} color={color.BLACK}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={checkThisTaskAsFinished}>
                    <Ionicons name={icons.ICON_TASK_DONE} size={24} color={color.BLACK}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteSelectedTask}>
                    <Ionicons name={icons.ICON_TRASH} size={24} color={color.BLACK}/>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        ...layout.shadowBase,
        bottom: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'absolute',
        width: layout.width,
        height: layout.height * 0.1,
        backgroundColor: color.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});
