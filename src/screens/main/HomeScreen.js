import React, {useState,useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {TaskList} from '../../components/Task/TaskList';
import {NoTasksPlaceHolder} from '../../components/Loaders/NoTasksPlaceholder';
import {setShowQuickActionsModal} from "../../store/actions/GeneralActions";
import {TasksQuickActions} from "../../components/Task/TasksQuickActions";
import {useDispatch, useSelector} from "react-redux";
import color from '../../constants/colors';
import layout from '../../constants/layout';
import screens from '../../constants/screens';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderButtons} from "../../components/common/AppHeaderButtons";
import {UserAvatar} from "../../components/UserAvatar";


export const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.GeneralReducer.taskList);
    const [dataForQuickActions, setDataForQuickActions] = useState(null);
    const isQuickActionsModalVisible = useSelector(state => state.GeneralReducer.isQuickActionsModalVisible);

    const onTaskPressHandler = (task) => {
        navigation.navigate(screens.TASK_DETAILS_SCREEN, {task});
    };


    const openQuickActionsWithData = (data) => {
        setDataForQuickActions(data);
        dispatch(setShowQuickActionsModal(true, data));
    };

    const closeQuickActions = () => {
        setDataForQuickActions(null);
        dispatch(setShowQuickActionsModal(false));
    };

    return (
        <View style={styles.mainContainer}>

            <TasksQuickActions isVisible={isQuickActionsModalVisible} onClosePressed={closeQuickActions} navigation={navigation} task={dataForQuickActions}/>

            {tasks
                ? <TaskList data={tasks} onTaskPress={onTaskPressHandler} onTaskLongPress={openQuickActionsWithData}/>
                : <NoTasksPlaceHolder/>}
        </View>
    );
};

HomeScreen.navigationOptions = ({navigation}) => ({
    headerTitle: () => {
        return (
            <TouchableOpacity>
                <Text style={styles.headerTitle}>Gotit</Text>
            </TouchableOpacity>
        );
    },
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButtons}>
           <TouchableOpacity style={styles.imageContainerStyle} onPress={() => navigation.navigate(screens.PROFILE_SCREEN)}>
               <UserAvatar/>
           </TouchableOpacity>
        </HeaderButtons>
    ),
});

const styles = StyleSheet.create({
    headerTitle: {
        ...layout.boldTextBase,
    },
    mainContainer: {
        paddingHorizontal: 20,
        backgroundColor: color.WHITE,
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        width: layout.width,
        height: layout.height,
        backgroundColor: '#00000099',
    },
    imageContainerStyle: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        borderRadius: 100
    },
});
