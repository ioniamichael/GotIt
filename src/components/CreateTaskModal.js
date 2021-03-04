import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Modal, ScrollView, FlatList, TouchableOpacity, Image, Text} from 'react-native';
import {CustomTextInput} from '../components/CustomTextInput';
import {YellowButton} from './YellowButton';
import {getCurrentDateInTimestamp} from '../utils';
import {createNewTask} from '../services/userService';
import {fetchTasks, setShowCreateTaskModal} from '../store/actions/GeneralActions';
import {useDispatch} from 'react-redux';
import layout from '../constants/layout';
import color from '../constants/colors';
import assets from '../constants/assets';

export const CreateTaskModal = ({isVisible, onClose}) => {

    const dispatch = useDispatch();

    const [taskType, setTaskType] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskCreationDate, setTaskCreationDate] = useState(() => getCurrentDateInTimestamp().toString());
    const [taskEndDate, setTaskEndDate] = useState(() => new Date().toDateString());
    const [subTasks, setSubTasks] = useState([]);
    const [isExpired, setIsExpired] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const createTask = async () => {

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
            dispatch(setShowCreateTaskModal(false));
            dispatch(fetchTasks());
        } catch (e) {
            console.log('::CREATE TASK ', e);
        }
    };


    return (

        <Modal
            onRequestClose={onClose}
            visible={isVisible}
            animationType='slide'
            transparent>

            <ScrollView style={styles.container}>
                <View style={styles.innerContainer}>

                    <Text style={styles.screenTitle}>Let's create new task</Text>

                    <FlatList
                        style={styles.typesContainerStyle}
                        data={assets.PICKER}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        keyExtractor={(type, index) => 'D' + index.toString()}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={setTaskType(item.TYPE)} style={styles.pickerContainerStyle}>
                                    <Image source={item.IMAGE} style={styles.pickerImageStyles}/>
                                </TouchableOpacity>
                            );
                        }}
                    />

                    <CustomTextInput
                        placeholder={'Title'} value={taskTitle}
                        onChangeText={setTaskTitle}/>

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
        bottom: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        ...layout.shadowBase,
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
        marginHorizontal: 10,
    },
    pickerImageStyles: {
        width: 50,
        height: 50,
    },
});
