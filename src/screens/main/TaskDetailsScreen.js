import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    Animated,
    Easing,
    LogBox
} from 'react-native';
import {getTaskImageByType} from '../../utils';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/common/AppHeaderButtons';
import {removeTaskFromDB, setTaskAsFinished} from '../../services/userService';
import {deleteTask, fetchTasks, setShowLoader} from '../../store/actions/GeneralActions';
import {TaskLoader} from '../../components/Loaders/TaskLoader';
import {EditTaskScreen} from './EditTaskScreen';
import {TaskDetailsDateSection} from '../../components/Task/TaskDetailsDateSection';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import icons from '../../constants/icons';
import {ImageItem} from "../../components/Task/ImageItem";
import {StaticImageItem} from "../../components/common/StaticImageItem";


export const TaskDetailsScreen = ({navigation}) => {

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

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
                <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item, index) => item + index}
                    data={task.subTasks}
                    renderItem={({item, index}) => {
                        return (
                            <Text style={{...layout.regularTextBase, color: color.DARK_GREY}}>{index + 1}- {item}</Text>
                        )
                    }}
                />
            );
        }
    };

    const renderTaskImages = () => {
        if (task.images) {
            return (
                    <FlatList
                        style={styles.imageContainer}
                        scrollEnabled={false}
                        numColumns={2}
                        data={task.images}
                        keyExtractor={(item, index) => item + index}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => {
                            return (
                                <StaticImageItem indexToAnimate={index} item={item}/>
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
    imageContainer: {
        alignSelf:'center'
    },
});
