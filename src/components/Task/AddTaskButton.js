import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import assets from '../../constants/assets';
import {useDispatch} from 'react-redux';
import {setShowCreateTaskModal} from '../../store/actions/GeneralActions';


export const AddTaskButton = () => {

    const dispatch = useDispatch();

    return (
        <TouchableOpacity style={styles.rootView} onPress={() => dispatch(setShowCreateTaskModal(true))}>
            <Image source={assets.ADD_TASK_BUTTON} style={{width: 80, height: 80}}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rootView: {
        position: 'absolute',
        bottom: 0,
    },
});
