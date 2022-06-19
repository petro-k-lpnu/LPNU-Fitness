import React from "react";
import { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, BackHandler, Dimensions, FlatList, Image, TouchableOpacity, ImageBackground } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Snackbar } from 'react-native-paper';
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('screen');

const workoutTypesList = [
    {
        id: '1',
        image: require('../../assets/images/workout/workout_1.jpg'),
        workoutType: 'Відтискання',
        timeInMinutes: 2,
        isDone: true,
    },
    {
        id: '2',
        image: require('../../assets/images/workout/workout_2.jpg'),
        workoutType: 'Скручування',
        timeInMinutes: 2,
        isDone: false,
    },
    {
        id: '3',
        image: require('../../assets/images/workout/workout_3.jpg'),
        workoutType: 'Підтягування колін у планці',
        timeInMinutes: 3,
        isDone: false,
    },
    {
        id: '4',
        image: require('../../assets/images/workout/workout_4.jpg'),
        workoutType: 'Складка',
        timeInMinutes: 2,
        isDone: false,
    },
    {
        id: '5',
        image: require('../../assets/images/workout/workout_5.jpg'),
        workoutType: 'Планка',
        timeInMinutes: 3,
        isDone: false,
    },
    {
        id: '6',
        image: require('../../assets/images/workout/workout_6.jpg'),
        workoutType: 'Нахили в сторони з м\'ячем',
        timeInMinutes: 3,
        isDone: false,
    }
];

class WorkoutDetailScreen extends Component {

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

    item = this.props.navigation.getParam('item');

    state = {
        showSnackBar: false,
        isFavourite: false,
    }

    static sharedElements = (navigation, otherNavigation, showing) => {
        const item = navigation.getParam('item');
        return [item.id];
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {this.workoutImage()}
                                {this.workoutBenifits()}
                            </>
                        }
                        data={workoutTypesList}
                        keyExtractor={(item) => `{${item.id}}`}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingTop: Sizes.fixPadding * 2.0,
                            paddingBottom: Sizes.fixPadding * 11.0,
                        }}
                    />
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[
                            'rgba(56, 142, 60, 1)',
                            'rgba(56, 142, 60, 1)',
                            'rgba(76, 175, 80, 1)',
                            'rgba(76, 175, 80, 0.6)',
                        ]}
                        style={styles.startWorkoutButtonStyle}
                    >
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('StartWorkout')}
                        >
                            <Text style={{ ...Fonts.whiteColor16Medium }}>
                                Розпочати тренування
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        {
                            this.state.isFavourite ?
                                `Added to favorite` :
                                `Remove from favorite`
                        }
                    </Text>
                </Snackbar>
            </SafeAreaView >
        )
    }

    renderItem = ({ item, index }) => (
        <View>
            <View style={styles.workoutTypesWrapStyle}>
                <Image
                    source={item.image}
                    style={{
                        borderColor: index % 2.0 == 0.0 ? Colors.primaryColor : '#C62828',
                        ...styles.workoutTypesImageStyle
                    }}
                    resizeMode="cover"
                />
                <View style={{ marginLeft: Sizes.fixPadding * 7.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold, width: width / 2.3 }}>
                        {item.workoutType}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 8.0, alignItems: 'center' }}>
                        <Text style={{ ...Fonts.blackColor12Bold }}>
                            Час:
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Medium, marginLeft: Sizes.fixPadding - 6.0, }}>
                            {item.timeInMinutes} хв
                        </Text>
                    </View>
                </View>
                {item.isDone ?
                    <View style={styles.doneButtonWrapStyle}>
                        <MaterialIcons name="done" size={20} color={Colors.whiteColor} />
                    </View>
                    :
                    <View style={styles.remainButtonWrapStyle}>
                        <Text style={{ ...Fonts.whiteColor13Medium }}>
                            Наступна
                        </Text>
                    </View>
                }
            </View>
            {
                index == workoutTypesList.length - 1
                    ?
                    null
                    :
                    <View style={{
                        backgroundColor:
                            item.isDone ?
                                Colors.primaryColor : Colors.grayColor,
                        width: 1.5,
                        height: 40.0,
                        marginLeft: Sizes.fixPadding * 6.5,
                    }} />
            }
        </View>
    )

    workoutBenifits() {
        return (
            <View style={styles.workoutBenifitsWrapStyle}>
                <View style={{ flex: 40.0, paddingRight: Sizes.fixPadding * 2.0 }}>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        Вправ: 6
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14Medium, marginTop: Sizes.fixPadding - 5.0, }}>
                        Тривалість: 15 хв
                    </Text>
                </View>
                
            </View>
        )
    }

    workoutImage() {
        return (
            <SharedElement id={this.item.id}>
                <ImageBackground
                    source={this.item.image}
                    style={styles.workoutImageStyle}
                    borderRadius={Sizes.fixPadding}
                    resizeMode="cover"
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={[
                            'transparent',
                            'rgba(0,0,0,0.30)',
                            'rgba(0,0,0,0.80)',
                        ]}
                        style={styles.workoutImageShadowStyle}
                    >
                        <Text style={styles.workoutTypeTextStyle}>
                            {this.item.workoutType}
                        </Text>
                    </LinearGradient>
                </ImageBackground>
            </SharedElement>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.primaryColor19SemiBold }}>
                    {this.item.workoutType}
                </Text>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.primaryColor}
                    style={{ position: 'absolute', left: 20.0, }}
                    onPress={() => this.props.navigation.pop()}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
    },
    workoutImageStyle: {
        height: 210.0,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    workoutImageShadowStyle: {
        width: '100%',
        height: 210.0,
        borderRadius: Sizes.fixPadding,
        borderColor: '#E5E5E5',
        borderWidth: 1.5,
    },
    workoutTypeTextStyle: {
        ...Fonts.whiteColor15Medium,
        position: 'absolute',
        left: 10.0,
        bottom: 10.0,
    },
    workoutBenifitsWrapStyle: {
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.5,
    },
    workoutTypesWrapStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        justifyContent: 'space-between',
        marginRight: Sizes.fixPadding * 2.0,
        marginLeft: Sizes.fixPadding * 4.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    },
    workoutTypesImageStyle: {
        height: 90.0,
        width: 90.0,
        borderRadius: 45.0,
        borderWidth: 2.0,
        position: 'absolute',
        left: -20.0,
    },
    doneButtonWrapStyle: {
        backgroundColor: '#4CAF50',
        height: 25.0,
        width: 25.0,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    remainButtonWrapStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 6.0,
        paddingVertical: Sizes.fixPadding - 6.0,
        alignSelf: 'flex-start'
    },
    startWorkoutButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20.0,
        alignSelf: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    }
})

WorkoutDetailScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(WorkoutDetailScreen);