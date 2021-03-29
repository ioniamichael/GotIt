import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ImagePicker} from "../../components/Auth/ImagePicker";
import {useSelector} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';

export const ProfileScreen = () => {

    const userDetails = useSelector(state => state.UserReducer.userDetails);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <ImagePicker isDisabled={true} userName={userDetails.name} image={userDetails.image} onImagePicked={() => console.log('picked')} />
                <View style={styles.emailAndNameContainer}>
                    <Text style={{...layout.boldTextBase}}>{userDetails.name}</Text>
                    <Text style={{...layout.regularTextBase}}>{userDetails.email}</Text>
                </View>
            </View>
        </View>
    );
};

ProfileScreen.navigationOptions = () => ({
    headerTitle: () => {
        return (
            <View>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
        );
    }
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
