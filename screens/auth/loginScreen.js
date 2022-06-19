import React, { Component, useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';
import IntlPhoneInput from 'react-native-intl-phone-input';

class LoginScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    };

    render() {
        return (
            <Login navigation={this.props.navigation} />
        )
    }
}

const Login = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {backArrow()}
                {createAccountInfo()}
                {mobileNumberInfo()}
                {continueButton()}
            </View>
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Verification')}
                style={styles.continueButtonWrapStyle}>
                <View style={styles.continueButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                        Продовжити
                    </Text>
                </View>
            </TouchableOpacity>

        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 4.0 }}>
                <IntlPhoneInput
                    onChangeText={({ phoneNumber }) => setMobileNumber(phoneNumber)}
                    defaultCountry="UA"
                    containerStyle={styles.mobileNumberTextFieldStyle}
                    placeholder="номер телефону"
                    phoneInputStyle={{ flex: 1, borderBottomWidth: 0.80, borderBottomColor: Colors.primaryColor, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Medium }}
                    dialCodeTextStyle={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function createAccountInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{ ...Fonts.blackColor22SemiBold }}>
                    Введіть номер телефону
                </Text>
            </View>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons name="arrow-back" size={24} color={Colors.primaryColor}
                style={{
                    marginVertical: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding + 5.0
                }}
                onPress={() => navigation.goBack()}
            />
        )
    }
}

const styles = StyleSheet.create({
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding * 2.0,
    },
    mobileNumberTextFieldStyle: {
        ...Fonts.blackColor16Medium,
        height: 55.0,
        marginVertical: Sizes.fixPadding,
    }
})

LoginScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(LoginScreen);