import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {ImagePicker} from "../../components/Auth/ImagePicker";
import {FriendItem} from "../../components/FriendItem";
import {useDispatch, useSelector} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import {showFriendProfileModal} from '../../store/actions/GeneralActions';
import {FriendProfileScreen} from '../../components/Modals/FriendProfileScreen';
import {DeclineButton} from "../../components/common/DeclineButton";
import {signOut} from "../../services/userService";
import screens from "../../constants/screens";

export const ProfileScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.UserReducer.currentUser);
    const toShowFriendProfileModal = useSelector(state => state.GeneralReducer.showFriendProfileModal);

    const friends = currentUser.friends && Object.keys(currentUser.friends).map(key => ({
        ...currentUser.friends[key],
        id: key
    }));

    const onFriendPressed = (friend) => {
        dispatch(showFriendProfileModal(true, friend));
    };

    const logout = async () => {
        navigation.navigate(screens.SPLASH_SCREEN);
        await signOut();
    };

    const logOut = async () => {
        Alert.alert(
            'Log out',
            'Are you sure you watch to exit from the app.',
            [
                {
                    text: 'Not now',
                    onPress: () => {
                    },
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => logout()
                }
            ]
        );
    };

    return (
        <View style={styles.mainContainer}>

            <FriendProfileScreen toShowFriendProfileModal={toShowFriendProfileModal}/>

            <View style={styles.headerContainer}>
                <ImagePicker isDisabled={true} image={currentUser.userDetails.image}/>
                <View style={styles.emailAndNameContainer}>
                    <Text style={styles.nameTextStyle}>{currentUser.userDetails.name}</Text>
                    <Text style={styles.emailTextStyle}>{currentUser.userDetails.email}</Text>
                </View>
            </View>

            {friends && <View style={styles.friendsContainer}>

                <Text style={styles.regularText}>Friends - {friends.length} Peoples</Text>

                <FlatList
                    style={styles.usersListContainer}
                    data={friends}
                    keyExtractor={(item, index) => item + 'd' + index.toString()}
                    renderItem={({item, index}) => {
                        return (
                            <FriendItem indexToAnimate={index} friend={item.friendDetails}
                                        onFriendPress={(friend) => onFriendPressed(friend)}/>
                        )
                    }}
                />
            </View>}
                <DeclineButton buttonTitle={'Log out'} onButtonPressed={logOut}/>
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
    regularText:{...layout.regularTextBase},
    emailAndNameContainer: {
        marginStart: 15,
        marginEnd: 15,
        width: '62%',
        justifyContent: 'center',
    },
    usersListContainer: {
        marginHorizontal: -layout.defaultPaddingSize
    },
    nameTextStyle:{
        ...layout.boldTextBase,
        fontSize: 12,
        color: color.DARK_GREY,
    },
    emailTextStyle:{
        ...layout.regularTextBase,
        fontSize: 12,
        color: color.DARK_GREY,
    },
    rowContainer:{flex: 1, flexDirection: 'row'},
    friendsContainer:{marginTop: 20}
});
