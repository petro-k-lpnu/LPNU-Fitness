import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, BackHandler, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";

class WelcomeScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#BBE9E9' }}>
                <StatusBar translucent={false} backgroundColor='#BBE9E9' />
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}>
                    <View style={{ marginTop: Sizes.fixPadding * 9.0, }}>
                        {this.appTitleWithinspiringText()}
                    </View>
                    <View>
                        {this.countinueWithPhoneButton()}
                        {this.continueWithGoogleButton()}
                        {this.loginInfo()}
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    loginInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 6.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: 'center' }}>
                    Вже є акаунт?
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('Login')}
                >
                    <Text style={{
                        ...Fonts.primaryColor17SemiBold,
                        textAlign: 'center',
                        marginTop: Sizes.fixPadding * 2.0,
                    }}>
                        Увійти
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    continueWithGoogleButton() {
        return (
            <View style={styles.continueWithGoogleButtonStyle}>
                <Image
                    source={require('../../assets/images/google-icon.png')}
                    style={{ height: 25.0, width: 25.0, marginRight: Sizes.fixPadding * 2.5, }}
                    resizeMode="contain"
                />
                <Text style={{ ...Fonts.whiteColor17SemiBold }}>
                    Увійти через Google
                </Text>
            </View>
        )
    }

    countinueWithPhoneButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('Register')}
                style={styles.continueWithPhoneButtonStyle}>
                <Text style={{ ...Fonts.whiteColor17SemiBold }}>Зареєструватися</Text>
            </TouchableOpacity>
        )
    }

    appTitleWithinspiringText() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.blackColor25Bold }}>
                    LPNU - Фітнес тренування
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    continueWithFacebookButtonStyle: {
        backgroundColor: '#0080EC',
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 7.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        marginTop: Sizes.fixPadding,
    },
    continueWithGoogleButtonStyle: {
        backgroundColor: Colors.darkBlueColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 7.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        marginTop: Sizes.fixPadding
    },
    continueWithPhoneButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 7.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
});

WelcomeScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(WelcomeScreen);

