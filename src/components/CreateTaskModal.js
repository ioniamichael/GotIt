import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Modal, TextInput} from 'react-native';
import {CustomInputText} from './CustomInputText';
import {getCurrentDateInTimestamp} from '../utils';
import {YellowButton} from './YellowButton';
import layout from '../constants/layout';
import color from '../constants/colors';

const INITIAL_STATE = {
    icon: 'pencil-outline',
    taskTitle: '',
    taskCreationDate: getCurrentDateInTimestamp().toString(),
    taskEndDate: '',
    subTasks: [
        'Sub task 1',
        'Sub task 2',
    ],
    isExpired: false,
    isFinished: false,
};

export const CreateTaskModal = ({isVisible, onClose, onCreatePressed}) => {

    const [state, setState] = useState(INITIAL_STATE);

    return (
        <Modal
            visible={isVisible}
            animationType='slide'
            transparent onRequestClose={() => {
            onClose(!isVisible);
        }}>
            <View style={styles.container}>

                <CustomInputText
                    placeholder={'Title'} value={state.taskTitle}
                    onChangeText={taskTitle => setState((prevState) => ({
                        ...prevState,
                        taskTitle: taskTitle,
                    }))}/>

                <CustomInputText
                    placeholder={'Task end date'} value={state.taskEndDate}
                    onChangeText={taskEndDate => setState((prevState) => ({
                        ...prevState,
                        taskEndDate: taskEndDate,
                    }))}/>

                <YellowButton buttonTitle={'Create'} onButtonPressed={() => {
                    onCreatePressed(state);
                    setState({...state, INITIAL_STATE});
                    setState({...state, taskCreationDate: getCurrentDateInTimestamp().toString()});
                }}/>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        borderWidth: 1,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        position: 'absolute',
        width: layout.width,
        height: layout.height * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.WHITE,
    },
});
