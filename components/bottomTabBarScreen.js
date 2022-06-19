import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, BackHandler, Image, SafeAreaView, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors } from "../constants/styles";
import WorkoutScreen from "../screens/workout/workoutScreen";
import SearchScreen from "../screens/search/searchScreen";
import HealthTipsScreen from "../screens/healthTips/healthTipsScreen";
import ProfileScreen from "../screens/profile/profileScreen";

class BottomTabBarScreen extends Component {

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

    state = { currentIndex: 1 };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor={Colors.primaryColor}
                    />
                    {this.state.currentIndex == 1 ?
                        <WorkoutScreen />
                        :
                        this.state.currentIndex == 2 ?
                            <SearchScreen />
                            :
                            this.state.currentIndex == 3 ?
                                <HealthTipsScreen />
                                :
                                    <ProfileScreen />
                    }
                    <View style={styles.bottomTabBarStyle}>
                        {this.bottomTabBarItem({
                            index: 1,
                        })}
                        {this.bottomTabBarItem({
                            index: 2,
                        })}
                        {this.bottomTabBarItem({
                            index: 3,
                        })}

                        {this.bottomTabBarItem({
                            index: 5,
                        })}
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    bottomTabBarItem({ index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ alignItems: 'center' }}
                onPress={() => this.setState({ currentIndex: index })}
            >
                {index == 1 ?
                    <Image
                        source={
                            this.state.currentIndex == index ?
                                require('../assets/images/icon/1_active.png')
                                :
                                require('../assets/images/icon/1.png')
                        }
                        style={{ height: 30.0, width: 30.0, }}
                        resizeMode="cover"
                    />
                    :
                    index == 2 ?
                        <Image
                            source={
                                this.state.currentIndex == index ?
                                    require('../assets/images/icon/5_active.png')
                                    :
                                    require('../assets/images/icon/5.png')
                            }
                            style={{ height: 30.0, width: 30.0, }}
                            resizeMode="cover"
                        />
                        :
                        index == 3 ?
                            <Image
                                source={
                                    this.state.currentIndex == index ?
                                        require('../assets/images/icon/2_active.png')
                                        :
                                        require('../assets/images/icon/2.png')
                                }
                                style={{ height: 30.0, width: 30.0, }}
                                resizeMode="cover"
                            />
                            :
                            
                                <Image
                                    source={
                                        this.state.currentIndex == index ?
                                            require('../assets/images/icon/4_active.png')
                                            :
                                            require('../assets/images/icon/4.png')
                                    }
                                    style={{ height: 30.0, width: 30.0, }}
                                    resizeMode="cover"
                                />
                }
            </TouchableOpacity>
        )
    }
}

BottomTabBarScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(BottomTabBarScreen);

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
        elevation: 2.0
    },
})



