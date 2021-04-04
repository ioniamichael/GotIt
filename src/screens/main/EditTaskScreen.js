import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {CustomTextInput} from '../../components/common/CustomTextInput';
import {AcceptButton} from '../../components/common/AcceptButton';
import {createNewTask} from '../../services/userService';
import {fetchTasks, setShowLoader} from '../../store/actions/GeneralActions';
import {SubTasksView} from '../../components/Task/SubTasksView';
import {TaskTypePicker} from '../../components/Task/TaskTypePicker';
import {TaskImagePicker} from '../../components/Task/TaskImagePicker';
import {MainLoader} from '../../components/Loaders/MainLoader';
import {animateLayout} from "../../layoutUtils";
import {DeclineButton} from "../../components/common/DeclineButton";
import {useDispatch, useSelector} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import DatePicker from 'react-native-date-picker';
import strings from '../../constants/strings';
import screens from '../../constants/screens';


export const EditTaskScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const toShowLoader = useSelector(state => state.GeneralReducer.toShowLoader);

    const task = navigation.getParam('task');

    const [taskType, setTaskType] = useState(task.taskType);
    const [taskTitle, setTaskTitle] = useState(task.taskTitle);
    const [taskCreationDate] = useState(task.taskCreationDate);
    const [subTasks, setSubTasks] = useState(task.subTasks ? task.subTasks : []);
    const [isExpired] = useState(task.isExpired);
    const [isFinished] = useState(task.isFinished);
    const [subTaskValue, setSubTaskValue] = useState();
    const [taskTypeTitle, setTaskTypeTitle] = useState(task.taskType);
    const [images, setImages] = useState(task.images ? task.images : []);

    const [selectedDate, setSelectedDate] = useState(new Date(task.taskEndDate));
    const [taskEndDate, setTaskEndDate] = useState(selectedDate.getTime());

    useEffect(() => {
        setTaskEndDate(selectedDate.getTime());
    }, [selectedDate]);

    const updateTask = async () => {
        if (taskType.length && taskTitle.length) {
            const task = {
                taskType,
                taskTitle,
                taskCreationDate,
                taskEndDate,
                subTasks,
                isExpired,
                isFinished,
                images,
            };

            try {
                dispatch(setShowLoader(true));
                await createNewTask(task);
                await dispatch(fetchTasks());
                navigation.navigate(screens.TASK_DETAILS_SCREEN, {task});
                dispatch(setShowLoader(false));
            } catch (e) {
                dispatch(setShowLoader(false));
                console.log('::CREATE TASK ', e);
            }
        }
    };

    const addSubTaskToList = () => {
        if (subTaskValue) {
            setSubTasks([...subTasks, subTaskValue]);
            setSubTaskValue('');
            animateLayout();
        }
    };

    const deleteSubTaskHandler = (index) => {
        setSubTasks(subTasks.filter((subTask, i) => i !== index));
        animateLayout();
    };

    const deleteImage = (index) => {
        setImages(images.filter((image, i) => i !== index));
        animateLayout();
    };

    const selectType = (taskType) => {
        setTaskType(taskType.TYPE);
        setTaskTypeTitle(taskType.title);
    };

    return (
        <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps={'handled'}>

            <TaskTypePicker taskType={taskType} taskTypeTitle={taskTypeTitle} onTypeSelect={selectType}/>

            <View style={styles.innerContainer}>

                <View style={styles.whiteContainer}>
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
                </View>

                <TaskImagePicker images={images} onImagePicked={(image) => setImages([...images, image])}
                                 onDeleteImage={deleteImage}/>


                <View style={styles.whiteContainer}>

                    <TouchableOpacity>
                        <Text style={styles.pickDateTextStyle}>{strings.SELECT_END_DATE}</Text>
                    </TouchableOpacity>

                    <DatePicker
                        date={selectedDate}
                        androidVariant={'nativeAndroid'}
                        onDateChange={setSelectedDate}
                        minuteInterval={5}
                    />

                </View>

                <View style={styles.cancelAcceptButtonsContainer}>
                    <DeclineButton buttonTitle={strings.CANCEL} onButtonPressed={() => navigation.navigate(screens.TASK_DETAILS_SCREEN)}/>
                    <AcceptButton buttonTitle={strings.SAVE} onButtonPressed={updateTask}/>
                </View>

            </View>

            <MainLoader isVisible={toShowLoader}/>

        </ScrollView>
    );
};

EditTaskScreen.navigationOptions = () => ({
    headerTitle: () => {
        return (
            <View>
                <Text style={styles.headerTitle}>Edit task</Text>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    headerTitle: {
        ...layout.boldTextBase,
    },
    mainContainer: {},
    innerContainer: {
        marginVertical: 20,
    },
    whiteContainer: {
        alignItems: 'center',
        backgroundColor: color.WHITE,
        padding: 20,
        marginBottom: 20,
    },
    pickDateTextStyle: {
        ...layout.regularTextBase,
        marginBottom: 15,
        width: layout.width - (layout.defaultPaddingSize * 2)
    },
    cancelAcceptButtonsContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: color.WHITE,
        padding: 20,
    }
});
