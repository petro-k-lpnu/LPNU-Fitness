import React from "react";
import { View } from "react-native";
import * as Font from "expo-font";

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            Inter_Bold: require("../assets/fonts/inter/Inter-Bold.ttf"),
            Inter_SemiBold: require("../assets/fonts/inter/Inter-SemiBold.ttf"),
            Inter_Medium: require("../assets/fonts/inter/Inter-Medium.ttf"),
            Inter_Regular: require("../assets/fonts/inter/Inter-Regular.ttf"),
            Inter_Light: require("../assets/fonts/inter/Inter-Light.ttf"),
            Inter_ExtraLight: require("../assets/fonts/inter/Inter-ExtraLight.ttf"),
        });
        this.props.navigation.navigate('Splash');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            </View>
        )
    }
}

