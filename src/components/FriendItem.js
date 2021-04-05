import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import color from "../constants/colors";
import layout from "../constants/layout";
import assets from "../constants/assets";
import {ScaleAnimatedView} from "./common/ScaleAnimatedView";

export const FriendItem = ({friend, indexToAnimate, onFriendPress}) => {

    return (
        <ScaleAnimatedView indexToAnimate={indexToAnimate}>
            <TouchableOpacity activeOpacity={layout.activeOpacity} style={styles.itemContainer} onPress={() => onFriendPress(friend)}>

                <View style={styles.rootView}>
                    <Image
                        source={friend.image ? {uri: `data:image/jpeg;base64,${friend.image}`} : assets.USER_AVATAR_PLACEHOLDER}
                        style={styles.userImage}/>
                </View>

                <View style={styles.emailAndNameContainer}>
                    <Text style={styles.nameTextStyle}>{friend.name}</Text>
                    <Text style={styles.emailTextStyle}>{friend.email}</Text>
                </View>

            </TouchableOpacity>
        </ScaleAnimatedView>
    )
};


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: layout.defaultPaddingSize,
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
    rowContainer:{flex: 1, flexDirection: 'row'}
});
