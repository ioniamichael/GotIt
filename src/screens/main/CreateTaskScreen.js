import React, {useState} from 'react';
import {StyleSheet, View, Modal, ScrollView, FlatList, TouchableOpacity, Image, Text} from 'react-native';
import {CustomTextInput} from '../../components/Task/CustomTextInput';
import {YellowButton} from '../../components/YellowButton';
import {getCurrentDateInTimestamp} from '../../utils';
import {createNewTask} from '../../services/userService';
import {fetchTasks} from '../../store/actions/GeneralActions';
import {SubTasksView} from '../../components/Task/SubTasksView';
import {useDispatch} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import assets from '../../constants/assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/AppHeaderButtons';
import icons from '../../constants/icons';
import {HomeScreen} from './HomeScreen';
import {TaskTypePicker} from '../../components/Task/TaskTypePicker';
import {TimeAndDatePicker} from '../../components/Task/TimeAndDatePicker';
import {BABY} from '../../pickerTypes';

export const CreateTaskScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [taskType, setTaskType] = useState(BABY);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskCreationDate, setTaskCreationDate] = useState(() => getCurrentDateInTimestamp().toString());
    const [taskEndDate, setTaskEndDate] = useState(() => new Date().toDateString());
    const [subTasks, setSubTasks] = useState([]);
    const [isExpired, setIsExpired] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [subTaskValue, setSubTaskValue] = useState();
    const [taskTypeTitle, setTaskTypeTitle] = useState('Baby');

    const cleanState = () => {
        setTaskType(BABY);
        setTaskTitle('');
        setTaskCreationDate(getCurrentDateInTimestamp().toString());
        setTaskEndDate(new Date().toDateString());
        setSubTasks([]);
        setSubTaskValue('');
        setTaskTypeTitle('');
    };

    console.log(taskType)

    const createTask = async () => {

        if (taskType.length && taskTitle.length) {

            setTaskCreationDate(getCurrentDateInTimestamp().toString());
            setTaskEndDate(new Date().toDateString());

            const task = {
                taskType,
                taskTitle,
                taskCreationDate,
                taskEndDate,
                subTasks,
                isExpired,
                isFinished,
            };

            try {
                await createNewTask(task);
                await dispatch(fetchTasks());
                cleanState();
                navigation.navigate('HomeScreen');
            } catch (e) {
                console.log('::CREATE TASK ', e);
            }
        }
    };

    const addSubTaskToList = () => {
        if (subTaskValue.length) {
            setSubTasks([...subTasks, subTaskValue]);
            setSubTaskValue('');
        }
    };

    const deleteSubTaskHandler = (index) => {
        setSubTasks(subTasks.filter((subTask, i) => i !== index));
    };

    const selectType= (taskType) => {
        setTaskType(taskType.TYPE);
        setTaskTypeTitle(taskType.title);
    };

    return (
        <ScrollView style={styles.container}>

            <TaskTypePicker taskType={taskType} taskTypeTitle={taskTypeTitle} onTypeSelect={selectType} />

            <View style={styles.innerContainer}>

                <CustomTextInput
                    placeholder={'Title'} value={taskTitle}
                    onChangeText={setTaskTitle}/>

                <SubTasksView
                    subTasks={subTasks}
                    onAddSubTask={addSubTaskToList}
                    setSubTaskValue={setSubTaskValue}
                    subTaskValue={subTaskValue}
                    onPressDeleteSubTask={deleteSubTaskHandler}
                />

                {/*<CustomTextInput*/}
                    {/*placeholder={'Task end date'} value={taskEndDate}*/}
                    {/*onChangeText={setTaskEndDate}/>*/}

                <View style={{flexDirection: 'row', justifyContent: 'space-around', width: layout.width * 0.7}}>
                    <TimeAndDatePicker/>
                    <TimeAndDatePicker/>

                </View>
                <YellowButton buttonTitle={'Create'} onButtonPressed={createTask}/>

            </View>
        </ScrollView>
    );
};

CreateTaskScreen.navigationOptions = ({navigation}) => ({
    headerTitle: () => {
        return (
            <View>
                <Text style={styles.headerTitle}>Create new task</Text>
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
        backgroundColor: color.WHITE,
        paddingTop: layout.height * 0.03,
    },
    innerContainer: {
        alignItems: 'center',
        paddingHorizontal: 30
    },
});
