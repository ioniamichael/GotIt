import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {ImagePicker} from '../Auth/ImagePicker';
import {setShowLoader, showFriendProfileModal} from '../../store/actions/GeneralActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchUserDetails} from '../../store/actions/UserAction';
import {removeFriendFromDB} from '../../services/userService';
import {MainLoader} from '../Loaders/MainLoader';
import {useDispatch, useSelector} from 'react-redux';
import layout from '../../constants/layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from '../../constants/icons';
import color from '../../constants/colors';
import {ScaleAnimatedView} from "../common/ScaleAnimatedView";

export const FriendProfileScreen = ({toShowFriendProfileModal}) => {

    const isLoaderShown = useSelector(state => state.GeneralReducer.toShowLoader);
    const dispatch = useDispatch();
    const friend = useSelector(state => state.GeneralReducer.friend);

    const closeModal = () => {
        dispatch(showFriendProfileModal(false, {}));
    };

    const removeFriend = async () => {
        dispatch(setShowLoader(true));
        try {
            await removeFriendFromDB(friend.id);
            await dispatch(fetchUserDetails());
            closeModal();
        } catch (e) {
            console.log(':::Not removed', e);
        }
        dispatch(setShowLoader(false));
    };

    return (
        <Modal
            visible={toShowFriendProfileModal}
            animationType="fade"
            transparent={true}>

            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />

            <MainLoader isVisible={isLoaderShown}/>

            <SafeAreaView style={styles.mainContainer}>

                <TouchableOpacity onPress={() => closeModal()}>
                    <Ionicons name={icons.ICON_CLOSE} size={34} color={color.DARK_GREY}/>
                </TouchableOpacity>

                <View style={styles.headerContainer}>
                    <ImagePicker isDisabled={true}
                                 image={friend.image}/>

                    <View style={styles.emailAndNameContainer}>
                        <Text style={{...layout.boldTextBase}}>{friend.name}</Text>
                        <Text style={{...layout.regularTextBase}}>{friend.email}</Text>
                    </View>

                </View>

                <TouchableOpacity activeOpacity={layout.activeOpacity} style={styles.addToFriedButton}
                                  onPress={removeFriend}>
                    <Text style={{...layout.regularTextBase}}>Remove friend</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: layout.defaultPaddingSize,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        alignItems: 'center',
        marginVertical: 20,
    },
    addToFriedButton: {
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 150,
        ...layout.shadowBase,
        backgroundColor: color.GREEN,
    },
});
