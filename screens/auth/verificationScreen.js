import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, BackHandler, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { TransitionPresets } from 'react-navigation-stack';
import { CircleFade } from 'react-native-animated-spinkit';

const { width } = Dimensions.get('screen');

class VerificationScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.backArrow()}
                    {this.verificationInfo()}
                    {this.otpFields()}
                    {this.continueButton()}
                </View>
                {this.loading()}
            </SafeAreaView>
        )
    }

    loading() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0 }}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={40} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor15Medium,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Будь ласка зачекайте..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    otpFields() {
        return (
            <View style={styles.otpFieldsWrapStyle}>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={this.state.firstDigit}
                        style={{ ...Fonts.blackColor16SemiBold, paddingLeft: Sizes.fixPadding }}
                        onChangeText={(text) => {
                            this.setState({ firstDigit: text })
                            this.secondTextInput.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={this.state.secondDigit}
                        style={{ ...Fonts.blackColor16SemiBold, paddingLeft: Sizes.fixPadding - 3.0 }}
                        ref={(input) => { this.secondTextInput = input; }}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            this.setState({ secondDigit: text })
                            this.thirdTextInput.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor16SemiBold, paddingLeft: Sizes.fixPadding - 3.0 }}
                        keyboardType="numeric"
                        value={this.state.thirdDigit}
                        ref={(input) => { this.thirdTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ thirdDigit: text })
                            this.forthTextInput.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor16SemiBold, paddingLeft: Sizes.fixPadding - 3.0 }}
                        keyboardType="numeric"
                        value={this.state.forthDigit}
                        ref={(input) => { this.forthTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ forthDigit: text })
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                this.setState({ isLoading: false })
                                this.props.navigation.navigate('BottomTabBar');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ isLoading: true })
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.navigate('BottomTabBar');
                    }, 2000)
                }}
                style={styles.continueButtonWrapStyle}>
                <View style={styles.continueButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                        Продовжити
                    </Text>
                </View>
            </TouchableOpacity>

        )
    }

    verificationInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{ ...Fonts.blackColor22SemiBold }}>
                    Підтвердження номеру телефону
                </Text>
                <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding + 5.0 }}>
                    Введіть пароль з СМС
                </Text>
            </View>
        )
    }

    backArrow() {
        return (
            <MaterialIcons name="arrow-back" size={24} color={Colors.primaryColor}
                style={{
                    marginVertical: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding + 5.0
                }}
                onPress={() => this.props.navigation.pop()}
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
    otpFieldsWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    textFieldWrapStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderColor: 'rgba(40, 105, 142,.20)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingTop: Sizes.fixPadding + 10.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
})

VerificationScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(VerificationScreen);