import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

class TermsOfUseScreen extends Component {

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
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View>
                    {this.header()}
                    {this.termsOfUseInfo()}
                </View>
            </SafeAreaView>
        )
    }

    termsOfUseInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor14Medium, textAlign: 'justify' }}>
                Користувачем Додатку вважається будь-яка фізична особа, яка коли-небудь
здійснювала доступ до/використання Додатку та досягла віку допустимого для акцепту
цієї Угоди, відповідно до положень законодавства.
                </Text>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
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
                    Умови використання
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
})

TermsOfUseScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(TermsOfUseScreen);