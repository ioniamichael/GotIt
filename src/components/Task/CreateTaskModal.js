import React, {useState} from 'react';
import {StyleSheet, View, Modal, ScrollView, Text, TouchableOpacity} from 'react-native';
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
import DatePicker from 'react-native-date-picker'
import strings from '../../constants/strings';

export const CreateTaskModal = ({navigation, isVisible}) => {
    const dispatch = useDispatch();

    const [taskType, setTaskType] = useState(BABY);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskCreationDate, setTaskCreationDate] = useState(() => getCurrentDateInTimestamp().toString());
    const [taskEndDate, setTaskEndDate] = useState(new Date());
    const [subTasks, setSubTasks] = useState([]);
    const [isExpired, setIsExpired] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [subTaskValue, setSubTaskValue] = useState();
    const [taskTypeTitle, setTaskTypeTitle] = useState('Baby');

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
                await createNewTask(task);
                await dispatch(fetchTasks());
                cleanState();
                dispatch(setShowCreateTaskModal(false));
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

    const closeModal = () => {
        dispatch(setShowCreateTaskModal(false));
        cleanState();
    };


    return (

        <Modal
            onRequestClose={() => closeModal()}
            visible={isVisible}
            animationType='slide'
            transparent>
            <ScrollView style={styles.container}>

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


                    <View style={styles.mainContainer}>
                        <TouchableOpacity>
                            <Text style={{...layout.boldTextBase, fontSize: 12}}>{strings.SELECT_END_DATE}</Text>
                        </TouchableOpacity>
                        <DatePicker
                            date={taskEndDate}
                            onDateChange={setTaskEndDate}
                            minimumDate={new Date()}
                            minuteInterval={5}
                        />
                    </View>

                    <YellowButton buttonTitle={strings.CREATE} onButtonPressed={createTask}/>

                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: layout.width,
        height: layout.height * 0.7,
        position: 'absolute',
        bottom: 0,
        backgroundColor: color.WHITE,
        ...layout.shadowBase,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    innerContainer: {
        alignItems: 'center',
    },
});
