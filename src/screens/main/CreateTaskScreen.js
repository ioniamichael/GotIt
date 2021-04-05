import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {CustomTextInput} from '../../components/common/CustomTextInput';
import {AcceptButton} from '../../components/common/AcceptButton';
import {getCurrentDateInTimestamp} from '../../utils';
import {createNewTask} from '../../services/generalServices';
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
import {BABY} from '../../pickerTypes';
import DatePicker from 'react-native-date-picker';
import screens from '../../constants/screens';
import strings from '../../constants/strings';
import icons from "../../constants/icons";


export const CreateTaskScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const toShowLoader = useSelector(state => state.GeneralReducer.toShowLoader);

    const [taskType, setTaskType] = useState(BABY);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskCreationDate, setTaskCreationDate] = useState(() => getCurrentDateInTimestamp().toString());
    const [subTasks, setSubTasks] = useState([]);
    const [isExpired] = useState(false);
    const [isFinished] = useState(false);
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

    const onCancelPressed = () => {
        cleanState();
        navigation.navigate(screens.HOME_SCREEN);
    };

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>

            <TaskTypePicker taskType={taskType} taskTypeTitle={taskTypeTitle} onTypeSelect={selectType}/>

            <View style={styles.innerContainer}>

                <View style={styles.whiteContainer}>

                    <Text style={styles.pickDateTextStyle}>Add task details:</Text>

                    <CustomTextInput
                        icon={icons.ICON_TASKS}
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
                        minimumDate={new Date()}
                    />
                </View>

                <View style={styles.cancelAcceptButtonsContainer}>
                    <DeclineButton buttonTitle={strings.CANCEL} onButtonPressed={onCancelPressed}/>
                    <AcceptButton buttonTitle={strings.CREATE} onButtonPressed={createTask}/>
                </View>

            </View>

            <MainLoader isVisible={toShowLoader}/>

        </ScrollView>
    );
};

CreateTaskScreen.navigationOptions = () => ({
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
    whiteContainer: {
        alignItems: 'center',
        backgroundColor: color.WHITE,
        padding: 20,
        marginBottom: 20,
    },
    container: {},
    innerContainer: {
        marginVertical: 20,
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
