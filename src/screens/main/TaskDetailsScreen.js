import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {getTaskImageByType} from '../../utils';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/common/AppHeaderButtons';
import {removeTaskFromDB, setTaskAsFinished} from '../../services/userService';
import {deleteTask, fetchTasks, setShowLoader} from '../../store/actions/GeneralActions';
import {TaskLoader} from '../../components/Loaders/TaskLoader';
import {EditTaskScreen} from './EditTaskScreen';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import moment from 'moment';
import icons from '../../constants/icons';
import appConfig from '../../constants/appConfig';
import {TaskDetailsDateSection} from '../../components/Task/TaskDetailsDateSection';


export const TaskDetailsScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const toShowLoader = useSelector(state => state.GeneralReducer.toShowLoader);

    const task = navigation.getParam('task');
    const [isFinished, setIsFinished] = useState(task.isFinished);

    const checkThisTaskAsFinished = async () => {
        dispatch(setShowLoader(true));
        try {
            await setTaskAsFinished(task);
            await dispatch(fetchTasks());
            setIsFinished(!isFinished);
        } catch (e) {
            console.log(e);
        }
        dispatch(setShowLoader(false));
    };

    const deleteSelectedTask = async () => {
        dispatch(setShowLoader(true));
        try {
            await removeTaskFromDB(task.taskCreationDate);
            await dispatch(deleteTask(task.taskCreationDate));
            await dispatch(fetchTasks());
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
        dispatch(setShowLoader(false));
    };

    const openEditTaskScreenWithTask = () => {
        navigation.navigate('EditTaskScreen', {task});
    };

    useEffect(() => {
        navigation.setParams({navigateToEditScreen: openEditTaskScreenWithTask});
    }, [task]);

    useEffect(() => {
        navigation.setParams({isTaskFinished: isFinished});
    }, [isFinished]);

    useEffect(() => {
        navigation.setParams({deleteTask: deleteSelectedTask, checkAsFinished: checkThisTaskAsFinished});
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

    const renderTaskImages = () => {
        if (task.images) {
            return (
                <FlatList
                    data={task.images}
                    keyExtractor={(item, index) => item + index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                        return (
                            <View
                                style={{...layout.shadowBase, marginVertical: 15, marginEnd: 10, borderRadius: 20}}>
                                <Image source={{uri: `data:image/jpeg;base64,${item}`}} style={styles.imageStyle}/>
                            </View>
                        );
                    }}
                />
            );
        }
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <TaskLoader isVisible={toShowLoader}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                <TaskDetailsDateSection/>

                    <View style={styles.taskTypeContainer}>
                        <Image source={getTaskImageByType(task.taskType)} style={styles.taskTypeImage}/>
                    </View>


            </View>
            <Text style={{marginBottom: 30, ...layout.boldTextBase, textAlign: 'center'}}>{task.taskTitle}</Text>
            <View style={{marginBottom: 30}}>
                {renderSubTasks()}
            </View>
            <View style={{marginBottom: 30}}>
                {renderTaskImages()}
            </View>
        </ScrollView>
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
                onPress={navigation.getParam('navigateToEditScreen')}
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
    imageStyle: {
        width: layout.width * 0.4,
        height: layout.height * 0.12,
        borderRadius: 20,
    },
});
