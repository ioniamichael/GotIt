import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/AppHeaderButtons';
import icons from '../../constants/icons';
import layout from '../../constants/layout';
import color from '../../constants/colors';

export const AllTasksScreen = ({navigation}) => {

    return (
        <View style={styles.mainContainer}>

        </View>
    );
};


AllTasksScreen.navigationOptions = ({navigation}) => ({
    headerTitle: () => {
        return (
            <View>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
        );
    },
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButtons}>
            <Item
                onPress={
                    () => navigation.navigate('NotificationsScreen')
                }
                title={'NOTIFICATION'}
                iconName={icons.NOTIFICATION_ICON}/>
        </HeaderButtons>
    ),
});

const styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        flex: 1,
        backgroundColor: color.WHITE,
    },
    headerContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
});
