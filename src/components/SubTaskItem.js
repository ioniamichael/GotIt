import React from 'react';
import {StyleSheet, View, Text, Animated,TouchableOpacity, Easing} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import icons from "../constants/icons";
import color from "../constants/colors";
import layout from "../constants/layout";

export const SubTaskItem = ({subTask, renderedIndex, onPressDeleteButton}) => {

    let removeAnim = new Animated.Value(1);

    const onDeletePressHandler = () => {
        Animated.timing(
            removeAnim,
            {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => {
            onPressDeleteButton(renderedIndex)
        });
    };

    return(
        <Animated.View style={[styles.subTasksContainer,
            {
                transform: [
                    {scale: removeAnim}
                ]
            }]}>
            <Text style={styles.subTaskText}>{subTask}</Text>
            <TouchableOpacity onPress={() => onDeletePressHandler()} >
                <Ionicons name={icons.ICON_TRASH} size={20} color={color.DARK_GREY}/>
            </TouchableOpacity>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    subTasksContainer: {
        ...layout.shadowBase,
        paddingVertical: 20,
        marginBottom: 10,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: color.GREY,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 40,
    },
    subTaskText: {
        ...layout.regularTextBase,
        width: '85%',
    },
});
