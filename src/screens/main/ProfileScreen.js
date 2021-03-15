import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/AppHeaderButtons';
import {ImagePicker} from "../../components/Auth/ImagePicker";
import {useSelector} from 'react-redux';
import icons from '../../constants/icons';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import screens from '../../constants/screens';

export const ProfileScreen = ({navigation}) => {

    const userDetails = useSelector(state => state.UserReducer.userDetails);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <ImagePicker image={userDetails.image} onImagePicked={() => console.log('picked')} />
                <View style={styles.emailAndNameContainer}>
                    <Text style={{...layout.boldTextBase}}>{userDetails.name}</Text>
                    <Text style={{...layout.regularTextBase}}>{userDetails.email}</Text>
                </View>
            </View>
        </View>
    );
};


ProfileScreen.navigationOptions = ({navigation}) => ({
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
                    () => navigation.navigate(screens.NOTIFICATIONS_SCREEN)
                }
                title={'EDIT'}
                iconName={icons.ICON_EDIT}/>
        </HeaderButtons>
    ),
});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: layout.defaultPaddingSize,
        backgroundColor: color.WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
    },
    photoStyle: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    headerTitle: {
        ...layout.boldTextBase,
    },
    emailAndNameContainer: {
        marginStart: 15,
        marginEnd:15,
        width: '62%',
        justifyContent: 'center',
    },
    friendContainer: {
    },
    friendsCard:{

    }
});
