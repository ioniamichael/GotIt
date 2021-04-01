import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ImagePicker} from "../../components/Auth/ImagePicker";
import { useSelector} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import {FriendItem} from "../../components/FriendItem";

export const ProfileScreen = () => {

    const currentUser = useSelector(state => state.UserReducer.currentUser);
    const friends = Object.keys(currentUser.friends).map(key => ({...currentUser.friends[key], id: key}));



    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <ImagePicker isDisabled={true} image={currentUser.userDetails.image}/>
                <View style={styles.emailAndNameContainer}>
                    <Text style={{...layout.boldTextBase}}>{currentUser.userDetails.name}</Text>
                    <Text style={{...layout.regularTextBase}}>{currentUser.userDetails.email}</Text>
                </View>
            </View>

            <View style={{marginTop: 20}}>

                <Text style={{...layout.regularTextBase}}>Friends - {friends.length} Peoples</Text>

                <FlatList
                    style={styles.usersListContainer}
                    data={friends}
                    keyExtractor={(item, index) => item + 'd' + index.toString()}
                    renderItem={({item, index}) => {
                        return(
                            <FriendItem indexToAnimate={index} user={item.friendDetails} onUserPressed={()=>console.log('pressed in user')} />
                        )
                    }}
                />
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
    usersListContainer:{
        marginHorizontal: - layout.defaultPaddingSize
    },
});
