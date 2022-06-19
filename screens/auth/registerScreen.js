import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, ScrollView, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { TransitionPresets } from 'react-navigation-stack';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

class RegisterScreen extends Component {

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

    state = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.backArrow()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 10.0 }}
                    >
                        {this.registerInfo()}
                        {this.fullNameTextField()}
                        {this.emailTextField()}
                        {this.passwordTextField()}
                        {this.confirmPasswordTextField()}
                        {this.mobileNumberTextField()}
                    </ScrollView>
                    {this.continueButton()}
                </View>
            </SafeAreaView>
        )
    }

    continueButton() {
        return (
            <View style={styles.continueButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('Verification')}
                    style={styles.continueButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                        Продовжити
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }

    mobileNumberTextField() {
        return (
            <TextInput
                label="Номер телефону"
                left={<TextInput.Icon name="phone" color={Colors.primaryColor} />}
                mode="outlined"
                value={this.state.mobileNumber}
                keyboardType="numeric"
                onChangeText={text => this.setState({ mobileNumber: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
            />
        )
    }

    confirmPasswordTextField() {
        return (
            <TextInput
                label="Підтвердження паролю"
                left={<TextInput.Icon name="lock" color={Colors.primaryColor} />}
                mode="outlined"
                value={this.state.confirmPassword}
                onChangeText={text => this.setState({ confirmPassword: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
                secureTextEntry={true}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
            />
        )
    }

    passwordTextField() {
        return (
            <TextInput
                label="Пароль"
                left={<TextInput.Icon name="lock" color={Colors.primaryColor} />}
                mode="outlined"
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
                secureTextEntry={true}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
            />
        )
    }

    emailTextField() {
        return (
            <TextInput
                label="Email"
                left={<TextInput.Icon name="email" color={Colors.primaryColor} />}
                mode="outlined"
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
            />
        )
    }

    fullNameTextField() {
        return (
            <TextInput
                label="Ім'я"
                left={<TextInput.Icon name="account" color={Colors.primaryColor} />}
                mode="outlined"
                value={this.state.fullName}
                onChangeText={text => this.setState({ fullName: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
            />
        )
    }

    registerInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding + 5.0,
                marginBottom: Sizes.fixPadding * 4.0,
            }}>
                <Text style={{ ...Fonts.blackColor22SemiBold }}>
                    Реєстрація акаунту
                </Text>
            </View>
        )
    }

    backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.primaryColor}
                style={{
                    marginHorizontal: Sizes.fixPadding + 5.0,
                    marginTop: Sizes.fixPadding,
                    marginBottom: Sizes.fixPadding + 5.0,
                }}
                onPress={() => this.props.navigation.goBack()}
            />
        )
    }
}

const styles = StyleSheet.create({
    textFieldStyle: {
        ...Fonts.blackColor16SemiBold,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding - 3.0,
    },
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
    }
})

RegisterScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(RegisterScreen);