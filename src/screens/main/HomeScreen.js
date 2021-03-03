import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {TaskList} from '../../components/TaskList';
import {CreateTaskModal} from '../../components/CreateTaskModal';
import {createNewTask, removeTaskFromDB} from '../../services/userService';
import {deleteTask, fetchTasks} from '../../store/actions/GeneralActions';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../constants/colors';
import layout from '../../constants/layout';

export const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.UserReducer.userDetails);
    const tasks = useSelector(state => state.GeneralReducer.taskList);
    const [showModal, setShowModal] = useState(false);

    const onTaskPressHandler = async (task) => {
        try {
            await removeTaskFromDB(task.taskCreationDate);
            dispatch(deleteTask(task.taskCreationDate));
        } catch (e) {
            console.log(e);
        }
        // navigation.navigate('TaskDetailsScreen', {task});
    };

    const openCreateTaskModal = () => {
        setShowModal(true);
    };

    const createTaskHandler = async (taskDetails) => {
        try {
            await createNewTask(taskDetails);
            setShowModal(false);
            await dispatch(fetchTasks());
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Button title={'create'} onPress={openCreateTaskModal}/>
            <TaskList data={tasks} onTaskPress={onTaskPressHandler}/>
            <CreateTaskModal isVisible={showModal} onClose={setShowModal} onCreatePressed={createTaskHandler}/>
            {showModal && <View style={styles.overlay}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.WHITE,
    },
    overlay: {
        position: 'absolute',
        width: layout.width,
        height: layout.height,
        backgroundColor: '#00000099',
    },
});
