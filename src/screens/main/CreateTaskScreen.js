import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {CustomTextInput} from '../../components/Task/CustomTextInput';
import {YellowButton} from '../../components/YellowButton';
import {getCurrentDateInTimestamp} from '../../utils';
import {createNewTask} from '../../services/userService';
import {fetchTasks, setShowLoader} from '../../store/actions/GeneralActions';
import {SubTasksView} from '../../components/Task/SubTasksView';
import {TaskTypePicker} from '../../components/Task/TaskTypePicker';
import {TaskImagePicker} from '../../components/Task/TaskImagePicker';
import {TaskLoader} from '../../components/Loaders/TaskLoader';
import {useDispatch, useSelector} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import {BABY} from '../../pickerTypes';
import DatePicker from 'react-native-date-picker';
import strings from '../../constants/strings';
import screens from '../../constants/screens';
import {animateLayout} from "../../layoutUtils";



export const CreateTaskScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const toShowLoader = useSelector(state => state.GeneralReducer.toShowLoader);

    const [taskType, setTaskType] = useState(BABY);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskCreationDate, setTaskCreationDate] = useState(() => getCurrentDateInTimestamp().toString());
    const [subTasks, setSubTasks] = useState([]);
    const [isExpired, setIsExpired] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [subTaskValue, setSubTaskValue] = useState();
    const [taskTypeTitle, setTaskTypeTitle] = useState('Baby');
    const [images, setImages] = useState([]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [taskEndDate, setTaskEndDate] = useState(selectedDate.getTime());

    useEffect(() => {
        setTaskEndDate(selectedDate.getTime());
    }, [selectedDate]);

    const cleanState = () => {
        setTaskType(BABY);
        setTaskTitle('');
        setTaskCreationDate(getCurrentDateInTimestamp().toString());
        setSubTasks([]);
        setImages([]);
        setSubTaskValue('');
        setTaskTypeTitle('');
        setTaskEndDate(selectedDate.getTime())
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
                images
            };

            try {
                dispatch(setShowLoader(true));
                await createNewTask(task);
                await dispatch(fetchTasks());
                cleanState();
                navigation.navigate(screens.HOME_SCREEN);
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

                    <TaskImagePicker images={images} onImagePicked={(image) => setImages([...images, image])}
                                     onDeleteImage={deleteImage}/>


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
                            androidVariant={'nativeAndroid'}
                            onDateChange={setSelectedDate}
                            minimumDate={new Date()}
                            minuteInterval={5}
                        />

                    </View>

                    <YellowButton buttonTitle={strings.CREATE} onButtonPressed={createTask}/>

                </View>
            </View>

            <TaskLoader isVisible={toShowLoader}/>

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
    }
});

const styles = StyleSheet.create({
    headerTitle: {
        ...layout.boldTextBase,

    },
    container: {
        padding: layout.defaultPaddingSize,
        backgroundColor: color.WHITE,

    },
    innerContainer: {
        marginVertical: 30,
        alignItems: 'center',
    }
});
