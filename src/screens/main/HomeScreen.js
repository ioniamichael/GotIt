import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TaskList} from '../../components/Task/TaskList';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/AppHeaderButtons';
import {NoTasksPlaceHolder} from '../../components/Loaders/NoTasksPlaceholder';
import {setShowQuickActionsModal} from "../../store/actions/GeneralActions";
import {TasksQuickActions} from "../../components/Task/TasksQuickActions";
import {useDispatch, useSelector} from "react-redux";
import color from '../../constants/colors';
import layout from '../../constants/layout';
import icons from '../../constants/icons';
import assets from '../../constants/assets';
import screens from '../../constants/screens';


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
        dispatch(setShowQuickActionsModal(true));
    };

    const closeQuickActions = () => {
        setDataForQuickActions(null);
        dispatch(setShowQuickActionsModal(false));
    };

    return (
        <View style={styles.container}>


            <TasksQuickActions isVisible={isQuickActionsModalVisible} task={dataForQuickActions}
                               onClosePressed={closeQuickActions} navigation={navigation}/>

            {tasks
                ? <TaskList data={tasks} onTaskPress={onTaskPressHandler} onTaskLongPress={openQuickActionsWithData}/>
                : <NoTasksPlaceHolder/>}
        </View>
    );
};

HomeScreen.navigationOptions = ({navigation}) => ({
    headerTitle: () => {
        return (
            <View style={{marginStart: -20}}>
                <Image source={assets.APP_LOGO} style={{width: 90, height: 40}}/>
            </View>
        );
    },
    // headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={AppHeaderButtons}>
    //         <Item
    //             onPress={
    //                 () => navigation.navigate(screens.NOTIFICATIONS_SCREEN)
    //             }
    //             title={'NOTIFICATION'}
    //             iconName={icons.ICON_NOTIFICATION}/>
    //     </HeaderButtons>
    // ),
});

const styles = StyleSheet.create({
    headerTitle: {
        ...layout.boldTextBase,
    },
    container: {
        paddingHorizontal: 20,
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
