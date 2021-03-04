import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Modal, ScrollView, Button, FlatList, TouchableOpacity, Image, Text} from 'react-native';
import {CustomTextInput} from '../components/CustomTextInput';
import {YellowButton} from './YellowButton';
import {getCurrentDateInTimestamp} from '../utils';
import {createNewTask} from '../services/userService';
import {fetchTasks, setShowCreateTaskModal} from '../store/actions/GeneralActions';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch} from 'react-redux';
import layout from '../constants/layout';
import color from '../constants/colors';
import assets from '../constants/assets';
import {SubTasksView} from './SubTasksView';

export const CreateTaskModal = ({isVisible, onClose}) => {

    const dispatch = useDispatch();

    const [taskType, setTaskType] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskCreationDate, setTaskCreationDate] = useState(() => getCurrentDateInTimestamp().toString());
    const [taskEndDate, setTaskEndDate] = useState(() => new Date().toDateString());
    const [subTasks, setSubTasks] = useState([]);
    const [isExpired, setIsExpired] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [subTaskValue, setSubTaskValue] =useState();

    const cleanState = () => {
        setTaskType('');
        setTaskTitle('');
        setTaskCreationDate(getCurrentDateInTimestamp().toString());
        setTaskEndDate(new Date().toDateString());
        setSubTasks([]);
        setSubTaskValue('');
    };

    const closeModal = () => {
        cleanState();
        dispatch(setShowCreateTaskModal(false));
    };

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
                closeModal();
                dispatch(fetchTasks());
            } catch (e) {
                console.log('::CREATE TASK ', e);
            }
        }
    };

    const renderSelectedTypeStyle = (type) => {
        if (type == taskType){
            return{
                backgroundColor: color.YELLOW,
                borderRadius: 10,
                width: 60,
                height: 60,
                tintColor: color.WHITE,
            }
        } else {
            return{
                backgroundColor: color.GREY,
                borderRadius: 10,
                tintColor: color.YELLOW,
            }
        }
    };

    const addSubTaskToList = () => {
        if (subTaskValue.length) {
            setSubTasks([...subTasks, subTaskValue])
            setSubTaskValue('')
        }
    };

    const deleteSubTaskHandler = (index) => {
        setSubTasks(subTasks.filter((subTask, i) => i !== index));
    };


    return (

        <Modal
            onRequestClose={() => closeModal()}
            visible={isVisible}
            animationType='slide'
            transparent>

            <ScrollView style={styles.container}>
                <View style={styles.innerContainer}>

                    <Text style={styles.screenTitle}>Let's create new task</Text>
                    <Text style={{...layout.regularTextBase, marginBottom: 5}} >First pick your task type.</Text>

                    <FlatList
                        style={styles.typesContainerStyle}
                        data={assets.PICKER}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        keyExtractor={(type, index) => 'D' + index.toString()}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => setTaskType(item.TYPE)} style={styles.pickerContainerStyle}>
                                    <Image source={item.IMAGE} style={[styles.pickerImageStyles, renderSelectedTypeStyle(item.TYPE)]}/>
                                </TouchableOpacity>
                            );
                        }}
                    />

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

                    <CustomTextInput
                        placeholder={'Task end date'} value={taskEndDate}
                        onChangeText={setTaskEndDate}/>

                    <YellowButton buttonTitle={'Create'} onButtonPressed={createTask}/>

                </View>
            </ScrollView>
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
        height: layout.height * 0.7,
        backgroundColor: color.WHITE,
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
    },
    screenTitle:{
        ...layout.boldTextBase,
        marginTop: 30,
        marginBottom: 30,
    },
    typesContainerStyle:{
        marginBottom: 30,
    },
    pickerContainerStyle: {
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    pickerImageStyles: {
        tintColor: color.YELLOW,
        width: 50,
        height: 50,
    },
});
