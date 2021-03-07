import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import color from '../../constants/colors';
import layout from '../../constants/layout';

export const TimeAndDatePicker = ({onDateChange}) => {

    const [isDateVisible, setIsDateVisible] = useState(false);
    const [date, setDate] = useState(new Date());

    const handleDateChange = (value) => {
        console.log(value);
        setDate(value);
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.touchableOpacityContainer} onPress={() => setIsDateVisible(!isDateVisible)}>
                <Text style={{...layout.boldTextBase, fontSize: 13}}>Please choose end date</Text>
            </TouchableOpacity>
            <DatePicker
                date={date}
                onDateChange={handleDateChange}
                minimumDate={new Date()}
                minuteInterval={5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: color.WHITE,
        width: layout.width * 0.85,
        marginBottom: 20,
        borderRadius: 30,
        padding: 15,
        borderWidth: 1,
        borderColor: color.YELLOW
    },
    touchableOpacityContainer: {
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
    },
});
