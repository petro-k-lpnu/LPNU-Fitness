import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts } from "../constants/styles";
import { CircleFade } from 'react-native-animated-spinkit';

class SplashScreen extends Component {
    render() {
        setTimeout(() => {
            this.props.navigation.navigate('Welcome');
        }, 2000)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.whiteColor50SemiBold }}>
                        Вітання!
                    </Text>
                    <CircleFade size={45} color={Colors.whiteColor} style={{
                        position: 'absolute',
                        bottom: 40.0,
                        alignSelf: 'center'
                    }} />
                </View>
            </SafeAreaView>
        )
    }
}

SplashScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SplashScreen);