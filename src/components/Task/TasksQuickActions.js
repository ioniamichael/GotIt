import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated, Modal, Text} from 'react-native';
import {BlurView} from "@react-native-community/blur";
import {deleteTask, fetchTasks, setShowLoader, setShowQuickActionsModal} from '../../store/actions/GeneralActions';
import {removeTaskFromDB, setTaskAsFinished} from '../../services/userService';
import {useDispatch, useSelector} from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../constants/colors';
import icons from '../../constants/icons';
import layout from '../../constants/layout';

export const TasksQuickActions = ({task, isVisible, onClosePressed, navigation}) => {

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
        navigation.navigate('TaskDetailsScreen', {task});
    };

    const deleteSelectedTask = async () => {
        dispatch(setShowQuickActionsModal(false));
        dispatch(setShowLoader(true));
        try {
            await removeTaskFromDB(task.taskCreationDate);
            await dispatch(deleteTask(task.taskCreationDate));
            await dispatch(fetchTasks());
        } catch (e) {
            console.log(e);
        }
        dispatch(setShowLoader(false));
    };

    const checkThisTaskAsFinished = async () => {
        dispatch(setShowQuickActionsModal(false));
        dispatch(setShowLoader(true));
        try {
            await setTaskAsFinished(task);
            await dispatch(fetchTasks());
        } catch (e) {
            console.log(e)
        }
        dispatch(setShowLoader(false));
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >

            <TouchableOpacity onPress={onClosePressed} style={styles.exitButtonContainer}>
                <Ionicons name={icons.ICON_CLOSE} size={24} color={color.WHITE}/>
            </TouchableOpacity>

            <View style={styles.rootView}>

                <BlurView
                    style={styles.absolute}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                />

                {task &&
                <Text style={styles.modalTitle}> You are about to change your{'\n'}
                    <Text style={{...layout.boldTextBase, fontSize: 12}}>{task.taskTitle}</Text>{'\n'}task!</Text>}

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
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    rootView: {
        ...layout.shadowOfPinnedItem,
        height: layout.height * 0.22,
        width: layout.width,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center'
    },
    container: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    quickAction: {
        ...layout.shadowBase,
        backgroundColor: color.GREY,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    absolute: {
        borderRadius: 30,
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0
    },
    exitButtonContainer: {
        ...layout.shadowOfPinnedItem,
        height: 40,
        bottom: layout.height * 0.24,
        width: 40,
        borderRadius: 100,
        backgroundColor: color.ORANGE,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        ...layout.regularTextBase,
        left: 30,
        right: 30,
        textAlign: 'center',
        position: 'absolute',
        top: 10,
        alignSelf: 'center',
    },
});
