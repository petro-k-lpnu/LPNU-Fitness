import React, { Component } from "react";
import { Text, SafeAreaView, View, StatusBar, StyleSheet, Image, BackHandler, ScrollView, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-elements';
import { TransitionPresets } from 'react-navigation-stack';

class AccountSettingsScreen extends Component {

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
        name: 'Петро Карпюк',
        email: 'petro.karpiuk.itisz.2019@gmail.com',
        password: '12345',
        phoneNumber: '0986556159',
        showBottomSheet: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.profilePhoto()}
                        {this.nameTextField()}
                        {this.emailTextField()}
                        {this.phoneNumberTextField()}
                        {this.passwordTextField()}
                        {this.saveButton()}
                    </ScrollView>

                </View>
                {this.changeProfileOptions()}
            </SafeAreaView>
        )
    }

    changeProfileOptions() {
        return (
            <BottomSheet
                isVisible={this.state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: false })}
                    style={styles.bottomSheetWrapStyle}
                >
                    <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <View style={styles.bottomSheetDividerStyle} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-camera" size={17} color='#4C4C4C' />
                        <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={15} color='#4C4C4C' />
                        <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.saveButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>Save</Text>
            </TouchableOpacity>
        )
    }

    phoneNumberTextField() {
        return (
            <TextInput
                label="Phone Number"
                mode="outlined"
                keyboardType="numeric"
                value={this.state.phoneNumber}
                onChangeText={text => this.setState({ phoneNumber: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    passwordTextField() {
        return (
            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    emailTextField() {
        return (
            <TextInput
                label="Email"
                mode="outlined"
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    nameTextField() {
        return (
            <TextInput
                label="Name"
                mode="outlined"
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    profilePhoto() {
        return (
            <View style={{
                alignSelf: 'center',
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding + 5.0,
                alignItems: 'center',
            }}>
                <Image
                    source={require('../../assets/images/icon/4_active.png')}
                    style={{ height: 130.0, width: 130.0, borderRadius: 65.0, }}
                    resizeMode="cover"
                />
                
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <MaterialIcons name="arrow-back" size={24}
                    color="black"
                    onPress={() => this.props.navigation.pop()}
                    style={{ position: 'absolute', left: 20.0, }}
                />
                <Text style={{
                    ...Fonts.primaryColor19SemiBold,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    Налаштування
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
    },
    saveButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    bottomSheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding + 5.0,
    },
    changeInfoWrapStyle: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0.0,
        paddingVertical: Sizes.fixPadding - 7.0,
        backgroundColor: '#FF9800',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
    },
    bottomSheetDividerStyle: {
        backgroundColor: '#CFC6C6',
        height: 1.0,
        marginBottom: Sizes.fixPadding + 2.0,
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    textFieldStyle: {
        ...Fonts.blackColor15SemiBold,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding - 3.0
    }
})

AccountSettingsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(AccountSettingsScreen);