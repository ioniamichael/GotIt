import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import assets from '../../constants/assets';
import {useSelector} from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from "../../constants/icons";
import {ScaleAnimatedView} from "../common/ScaleAnimatedView";

export const SearchedUserItem = ({searchedUser, indexToAnimate, onUserPressed}) => {

    const currentUser = useSelector(state => state.UserReducer.currentUser);
    const friends = currentUser.friends && Object.keys(currentUser.friends).map(key => ({
        ...currentUser.friends[key],
        id: key,
    }));

    const renderFriendOrNotIcon = () => {
        if (friends) {
            for (let i = 0; i < friends.length; i++) {
                if (friends[i].friendDetails.id === searchedUser.id) {
                    return (
                        <View style={styles.friendIcon}>
                            <Ionicons name={icons.ICON_FRIENDS} size={layout.defaultIconSize} color={color.GREEN}/>
                            <Text style={{...layout.regularTextBase, fontSize: 8}}>Friend</Text>
                        </View>
                    )
                }
            }
        }
    };

    return (
        <ScaleAnimatedView indexToAnimate={indexToAnimate}>
            <TouchableOpacity activeOpacity={layout.activeOpacity}
                              onPress={() => onUserPressed(searchedUser)} style={styles.mainContainer}>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.rootView}>
                        <Image
                            source={searchedUser.image ? {uri: `data:image/jpeg;base64,${searchedUser.image}`} : assets.USER_AVATAR_PLACEHOLDER}
                            style={styles.userImage}/>
                    </View>

                    <View style={styles.emailAndNameContainer}>
                        <Text style={{
                            ...layout.boldTextBase,
                            fontSize: 12,
                            color: color.DARK_GREY,
                        }}>{searchedUser.name}</Text>
                        <Text style={{
                            ...layout.regularTextBase,
                            fontSize: 12,
                            color: color.DARK_GREY,
                        }}>{searchedUser.email}</Text>
                    </View>
                </View>

                {renderFriendOrNotIcon()}

            </TouchableOpacity>
        </ScaleAnimatedView>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        marginHorizontal: layout.defaultPaddingSize,
    },
    emailAndNameContainer: {
        justifyContent: 'center',
        marginStart: 10,
    },
    rootView: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: color.GREY,
        borderRadius: 100,
        ...layout.shadowBase,
    },
    userNameOnPic: {
        ...layout.regularTextBase,
        fontSize: 16,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    friendIcon: {
        alignSelf: 'center',
        alignItems: 'center',
    }
});
