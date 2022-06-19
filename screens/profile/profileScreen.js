import React from "react";
import { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

class ProfileScreen extends Component {

    state = {
        isLogout: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0, }}
                    >
                        {this.userInfo()}

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('Notifications')}
                        >
                            {this.aboutAndAppTitle({ title: 'Сповіщення' })}
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('TermsOfUse')}
                        >
                            {this.aboutAndAppTitle({ title: 'Умови використання' })}
                        </TouchableOpacity>

                        {this.aboutAndAppTitle({ title: 'Версія 1.0' })}
                        {this.logoutInfo()}
                    </ScrollView>
                </View>
                {this.logOutDialog()}
            </SafeAreaView>
        )
    }

    logOutDialog() {
        return (
            <Dialog.Container
                visible={this.state.isLogout}
                contentStyle={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Ви впевнені що хочете вийти?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding + 5.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ isLogout: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor16Medium }}>Назад</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ isLogout: false })
                                this.props.navigation.push('Welcome')
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Medium }}>Вийти</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }


    logoutInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ isLogout: true })}
                style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <MaterialCommunityIcons name="login-variant" size={24} color={Colors.redColor} />
                <Text style={{ ...Fonts.redColor16Medium, marginLeft: Sizes.fixPadding - 5.0 }}>Вийти</Text>
            </TouchableOpacity>
        )
    }

    aboutAndAppTitle({ title }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{
                        ...Fonts.blackColor17Medium,
                        width: width / 1.5,
                    }}>
                        {title}
                    </Text>
                    <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
                </View>
                <View
                    style={{
                        backgroundColor: Colors.grayColor,
                        height: 0.7,
                        marginVertical: Sizes.fixPadding * 2.0
                    }}
                />
            </View>
        )
    }

    title({ title }) {
        return (
            <Text style={{
                ...Fonts.blackColor13Medium, marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding * 2.0,
            }}>
                {title}
            </Text>
        )
    }

    userInfo() {
        return (
            <View style={styles.userInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icon/4_active.png')}
                        style={{ height: 62.0, width: 62.0, borderRadius: 31.0 }}
                        resizeMode="cover"
                    />
                    <Text style={{ ...Fonts.blackColor17SemiBold, marginLeft: Sizes.fixPadding + 10.0 }}>
                        Карпюк Петро
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('AccountSettings')}
                    style={styles.editIconWrapStyle}>
                    <MaterialIcons name="edit" size={24} color={Colors.whiteColor} />
                </TouchableOpacity>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.primaryColor19SemiBold }}>
                    Profile
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 55.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfoWrapStyle: {
        flexDirection: 'row',
        margin: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    editIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    logOutButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    }
})

export default withNavigation(ProfileScreen);