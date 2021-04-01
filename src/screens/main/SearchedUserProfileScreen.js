import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity,Button} from 'react-native';
import {ImagePicker} from "../../components/Auth/ImagePicker";
import {BlurView} from "@react-native-community/blur";
import layout from '../../constants/layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from "../../constants/icons";
import color from "../../constants/colors";
import {useDispatch} from "react-redux";
import {showSearchedUserProfileModal} from "../../store/actions/GeneralActions";
import {SafeAreaView} from "react-native-safe-area-context";
import assets from "../../constants/assets";
import LottieView from "lottie-react-native";

export const SearchedUserProfileScreen = ({visible, searchedUser}) => {

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(showSearchedUserProfileModal(false))
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}>

            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />

            <SafeAreaView style={styles.mainContainer}>

                <TouchableOpacity onPress={() => closeModal()} >
                    <Ionicons name={icons.ICON_CLOSE} size={34} color={color.DARK_GREY}/>
                </TouchableOpacity>

                <View style={styles.headerContainer}>
                    <ImagePicker isDisabled={true}
                                 image={searchedUser.userDetails.image}/>

                    <View style={styles.emailAndNameContainer}>
                        <Text style={{...layout.boldTextBase}}>{searchedUser.userDetails.name}</Text>
                        <Text style={{...layout.regularTextBase}}>{searchedUser.userDetails.email}</Text>
                    </View>

                </View>

                <TouchableOpacity activeOpacity={layout.activeOpacity} style={styles.addToFriedButton}>
                    <Text style={{...layout.regularTextBase}}>Add to friends</Text>
                </TouchableOpacity>

            </SafeAreaView>



        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding:layout.defaultPaddingSize,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
    },
    headerContainer: {
        flex:1,
        justifyContent:'center',
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
        alignItems:'center',
        marginVertical: 20
    },
    addToFriedButton:{
        borderRadius:30,
        alignSelf:'center',
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:20,
        width: 150,
        ...layout.shadowBase,
        backgroundColor:color.GREEN
    }
});
