import React from "react";
import { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, BackHandler, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

class StartWorkoutScreen extends Component {

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
        isFavorite: false,
        isStart: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.backArrow()}
                    {this.workoutImage()}
                    {this.workoutDetailWithTime()}
                </View>
            </SafeAreaView>
        )
    }

    workoutDetailWithTime() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...Fonts.darkBlueColor14Medium, marginVertical: Sizes.fixPadding - 5.0, }}>
                        Підхід 1 / 3
                    </Text>
                    <Text style={{ ...Fonts.darkBlueColor20SemiBold, }}>
                    Стрибки з підйомом колін
                    </Text>
                    <Text style={{
                        ...Fonts.darkBlueColor27Bold,
                        marginTop: Sizes.fixPadding * 2.0,
                        marginBottom: Sizes.fixPadding * 4.0,
                    }}>
                        00:34
                    </Text>
                </View>

                <View style={styles.favoritePlayAndNextButtonsWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.setState({ isStart: !this.state.isStart })}
                        style={styles.startOrStopWorkoutButtonWrapStyle}
                    >
                        <MaterialIcons
                            name={this.state.isStart ? "pause" : "play-arrow"}
                            size={40}
                            color={Colors.whiteColor}
                        />
                    </TouchableOpacity>
                    <View style={styles.favoriteAndNextIconWrapStyle}>
                        <MaterialIcons
                            name="arrow-forward"
                            size={27}
                            color={Colors.darkBlueColor}
                        />
                    </View>
                </View>
            </View>
        )
    }

    workoutImage() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={require('../../assets/images/jump-girl.png')}
                    style={{ flex: 1 }}
                    resizeMode="contain"
                />
            </View>

        )
    }

    backArrow() {
        return (
            <MaterialIcons name="arrow-back" size={24} color="black"
                style={{
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginTop: Sizes.fixPadding * 2.0
                }}
                onPress={() => this.props.navigation.pop()}
            />
        )
    }
}

const styles = StyleSheet.create({
    favoriteAndNextIconWrapStyle: {
        height: 60.0,
        width: 60.0,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D3D3D9'
    },
    startOrStopWorkoutButtonWrapStyle: {
        height: 85.0,
        width: 85.0,
        borderRadius: 42.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.darkBlueColor
    },
    favoritePlayAndNextButtonsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: Sizes.fixPadding,
    },
})

StartWorkoutScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(StartWorkoutScreen);