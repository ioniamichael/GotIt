import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { getTaskImageByType} from '../../utils';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/AppHeaderButtons';
import {removeTaskFromDB, setTaskAsFinished} from '../../services/userService';
import {deleteTask, fetchTasks, setShowLoader} from '../../store/actions/GeneralActions';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import moment from 'moment';
import icons from '../../constants/icons';
import {useDispatch, useSelector} from 'react-redux';
import {TaskLoader} from '../../components/Loaders/TaskLoader';


export const TaskDetailsScreen = ({navigation}) => {

    const task = navigation.getParam('task');
    const dispatch = useDispatch();
    const [isFinished, setIsFinished] = useState(task.isFinished);

    const toShowLoader = useSelector(state => state.GeneralReducer.toShowLoader);

    const checkThisTaskAsFinished = async () => {
        dispatch(setShowLoader(true));
        try {
            await setTaskAsFinished(task);
            await dispatch(fetchTasks());
            setIsFinished(!isFinished);
            dispatch(setShowLoader(false));
        }catch (e) {
            dispatch(setShowLoader(false));
            console.log(e);
        }

    };

    const deleteSelectedTask = async ()  => {
        dispatch(setShowLoader(true));
        try {
            await removeTaskFromDB(task.taskCreationDate);
            await dispatch(deleteTask(task.taskCreationDate));
            await dispatch(fetchTasks());
            navigation.goBack();
            dispatch(setShowLoader(false));
        } catch (e) {
            dispatch(setShowLoader(false));
            console.log(e);
        }
    };

    useEffect(() => {
        navigation.setParams({isTaskFinished: isFinished})
    }, [isFinished]);

    useEffect(() => {
        navigation.setParams({deleteTask: deleteSelectedTask, checkAsFinished: checkThisTaskAsFinished})
    }, []);

    const renderSubTasks = () => {
        if (task.subTasks) {
            return (
                task.subTasks.map((subTask, index) => {
                    return (
                        <Text key={index.toString()}
                              style={{...layout.regularTextBase, color: color.DARK_GREY}}>{index + 1}- {subTask}</Text>
                    );
                })
            );
        }
    };

    return (
        <View style={styles.mainContainer}>
            <TaskLoader isVisible={toShowLoader} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                    <Text style={{...layout.boldTextBase,fontSize: 12, textAlign: 'center'}}>{moment(task.taskEndDate).format('MMMM-DD-YYYY')}</Text>
                    <Text style={{...layout.boldTextBase, textAlign: 'center'}}>{moment(task.taskEndDate).format('HH:MM')}</Text>
                </View>
                <TouchableOpacity style={styles.taskTypeContainer}>
                    <Image source={getTaskImageByType(task.taskType)} style={styles.taskTypeImage}/>
                </TouchableOpacity>
            </View>
            <Text style={{marginBottom: 30, ...layout.boldTextBase, textAlign: 'center'}}>{task.taskTitle}</Text>
            <View style={{marginBottom: 30}}>
                {renderSubTasks()}
            </View>
        </View>
    );
};

TaskDetailsScreen.navigationOptions = ({navigation}) => ({
    headerTitle: () => {
        return (
            <View>
                <Text style={styles.headerTitle}>Details:</Text>
            </View>
        );
    },
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButtons}>
            <Item
                onPress={navigation.getParam('deleteTask')}
                title={'DELETE'}
                iconName={icons.ICON_TRASH}/>
            <Item
                onPress={navigation.getParam('checkAsFinished')}
                title={'DELETE'}
                color={navigation.getParam('isTaskFinished') ? color.ORANGE : color.DARK_GREY}
                iconName={icons.ICON_TASK_DONE}/>
            <Item
                onPress={
                    () => alert('Not developed yet')
                }
                title={'EDIT'}
                iconName={icons.ICON_EDIT}/>
        </HeaderButtons>
    ),
});

const styles = StyleSheet.create({
    headerTitle: {
        ...layout.boldTextBase,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: color.WHITE,
        padding: layout.defaultPaddingSize,
    },
    taskTypeContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: color.GREY,
    },
    taskTypeImage: {
        width: 50,
        height: 50,
    },
});
