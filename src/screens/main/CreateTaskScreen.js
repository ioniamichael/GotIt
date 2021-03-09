import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {CustomTextInput} from '../../components/Task/CustomTextInput';
import {YellowButton} from '../../components/YellowButton';
import {getCurrentDateInTimestamp} from '../../utils';
import {createNewTask} from '../../services/userService';
import {fetchTasks, setShowCreateTaskModal} from '../../store/actions/GeneralActions';
import {SubTasksView} from '../../components/Task/SubTasksView';
import {TaskTypePicker} from '../../components/Task/TaskTypePicker';
import {useDispatch} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import {BABY} from '../../pickerTypes';
import DatePicker from 'react-native-date-picker';
import strings from '../../constants/strings';
import screens from '../../constants/screens';

export const CreateTaskScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [taskType, setTaskType] = useState(BABY);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskCreationDate, setTaskCreationDate] = useState(() => getCurrentDateInTimestamp().toString());
    const [subTasks, setSubTasks] = useState([]);
    const [isExpired, setIsExpired] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [subTaskValue, setSubTaskValue] = useState();
    const [taskTypeTitle, setTaskTypeTitle] = useState('Baby');

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [taskEndDate, setTaskEndDate] = useState(selectedDate.getTime());

    console.log(taskEndDate);

    useEffect(() => {
        setTaskEndDate(selectedDate.getTime());
    }, [selectedDate]);

    const cleanState = () => {
        setTaskType(BABY);
        setTaskTitle('');
        setTaskCreationDate(getCurrentDateInTimestamp().toString());
        setSubTasks([]);
        setSubTaskValue('');
        setTaskTypeTitle('');
    };

    const createTask = async () => {
        if (taskType.length && taskTitle.length) {
            setTaskCreationDate(getCurrentDateInTimestamp().toString());

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
                console.log('::TASK CREATION END DATE', taskEndDate);
                await createNewTask(task);
                await dispatch(fetchTasks());
                cleanState();
                navigation.navigate(screens.HOME_SCREEN);
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

    const selectType = (taskType) => {
        setTaskType(taskType.TYPE);
        setTaskTypeTitle(taskType.title);
    };


    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>

            <View style={{flex: 1}}>

                <TaskTypePicker taskType={taskType} taskTypeTitle={taskTypeTitle} onTypeSelect={selectType}/>

                <View style={styles.innerContainer}>

                    <CustomTextInput
                        placeholder={strings.PLACEHOLDER_TITLE} value={taskTitle}
                        onChangeText={setTaskTitle}/>

                    <SubTasksView
                        subTasks={subTasks}
                        onAddSubTask={addSubTaskToList}
                        setSubTaskValue={setSubTaskValue}
                        subTaskValue={subTaskValue}
                        onPressDeleteSubTask={deleteSubTaskHandler}
                    />


                    <View style={{marginBottom: 20}}>

                        <TouchableOpacity>
                            <Text style={{
                                ...layout.regularTextBase,
                                marginBottom: 15,
                                marginStart: -15,
                            }}>{strings.SELECT_END_DATE}</Text>
                        </TouchableOpacity>

                        <DatePicker
                            date={selectedDate}
                            onDateChange={setSelectedDate}
                            minimumDate={new Date()}
                            minuteInterval={5}
                        />

                    </View>

                    <YellowButton buttonTitle={strings.CREATE} onButtonPressed={createTask}/>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: layout.defaultPaddingSize,
        backgroundColor: color.WHITE,
    },
    innerContainer: {
        marginVertical: 30,
        alignItems: 'center',
    },
});
