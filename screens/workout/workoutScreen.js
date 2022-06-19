import React from "react";
import { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Image, Text, FlatList, ImageBackground, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('screen');

const workoutSliderList = [
    {
        id: 'slider1',
        image: require('../../assets/images/slider/slider_1.jpg'),
        workoutType: 'Комплекс вправ для всього тіла',
    },
    {
        id: 'slider2',
        image: require('../../assets/images/slider/slider_2.jpg'),
        workoutType: 'Силові тренування',
    },
    {
        id: 'slider3',
        image: require('../../assets/images/slider/slider_3.jpg'),
        workoutType: 'Тренуватися для схуднення',
    }
];

const homeWorkoutsList = [
    {
        id: 'home1',
        image: require('../../assets/images/quick_home_workout/quick_home_1.jpg'),
        workoutType: 'Комплекс вправ для пресу',
    },
    {
        id: 'home2',
        image: require('../../assets/images/quick_home_workout/quick_home_2.jpg'),
        workoutType: 'Ноги, стегна, сідниці',
    },
    {
        id: 'home3',
        image: require('../../assets/images/quick_home_workout/quick_home_3.jpg'),
        workoutType: 'Комплекс для рук і спини',
    },
    {
        id: 'home4',
        image: require('../../assets/images/quick_home_workout/quick_home_4.jpg'),
        workoutType: 'Кардіотренування',
    }
];


const popularWorkoutsList = [
    {
        id: 'workout1',
        image: require('../../assets/images/popular_workout/popular_workout_1.jpg'),
        workoutType: 'Ефективні вправи на прес',
        workoutTime: 20,
    },
    {
        id: 'workout2',
        image: require('../../assets/images/popular_workout/popular_workout_2.jpg'),
        workoutType: 'Вправи для ніг',
        workoutTime: 20,
    },
    {
        id: 'workout3',
        image: require('../../assets/images/popular_workout/popular_workout_3.jpg'),
        workoutType: 'Вправи зі скакалкою',
        workoutTime: 20,
    },
    {
        id: 'workout4',
        image: require('../../assets/images/popular_workout/popular_workout_4.jpg'),
        workoutType: 'Кардіо вправи',
        workoutTime: 20,
    },
    {
        id: 'workout5',
        image: require('../../assets/images/popular_workout/popular_workout_5.jpg'),
        workoutType: 'Джампінг Джек',
        workoutTime: 20,
    },
];


class WorkoutScreen extends Component {

    state = {
        workoutSlider: workoutSliderList,
        activeSlide: 0,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                    >
                        {this.workoutSlider()}
                        {this.title({ title: 'Тренування вдома' })}
                        {this.homeWorkouts()}
                        {this.title({ title: 'Популярні програми' })}
                        {this.popularWorkouts()}

                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    popularWorkouts() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('WorkoutDetail', { item })}
                style={styles.popularWorkoutsWrapStyle}>
                <SharedElement id={item.id}>
                    <Image
                        source={item.image}
                        style={styles.popularWorkoutsImageStyle}
                        resizeMode="cover"
                    />
                </SharedElement>
                <View style={{ padding: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.primaryColor16Medium }}>
                        {item.workoutType}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding - 7.0 }}>
                        <MaterialIcons name="timer" size={20} color={Colors.grayColor} />
                        <Text style={{ ...Fonts.grayColor14Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                            {item.workoutTime} хв
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                horizontal
                data={popularWorkoutsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    homeWorkouts() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('WorkoutDetail', {
                    item
                })}
            >
                <SharedElement id={item.id}>
                    <ImageBackground
                        source={item.image}
                        style={styles.homeWorkoutsImageStyle}
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
                            style={styles.homeWorkoutsShadowStyle}
                        >
                            <Text
                                numberOfLines={2}
                                style={styles.homeWorkoutsDescriptionStyle}>
                                {item.workoutType}
                            </Text>
                        </LinearGradient>
                    </ImageBackground>
                </SharedElement>
            </TouchableOpacity>
        )

        return (
            <FlatList
                horizontal
                data={homeWorkoutsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    title({ title }) {
        return (
            <Text style={{
                ...Fonts.primaryColor16SemiBold,
                margin: Sizes.fixPadding * 2.0,
            }}>
                {title}
            </Text>
        )
    }

    workoutSlider() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('WorkoutDetail', { item })}
            >
                <SharedElement id={item.id}>
                    <ImageBackground
                        source={item.image}
                        style={styles.sliderImageStyle}
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
                            style={styles.sliderShadowStyle}
                        >
                            <Text style={styles.sliderTextStyle}>
                                {item.workoutType}
                            </Text>
                        </LinearGradient>
                    </ImageBackground>
                </SharedElement>
            </TouchableOpacity>
        )
        return (
            <View>
                <Carousel
                    data={this.state.workoutSlider}
                    sliderWidth={width}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={4000}
                    itemWidth={width - 40}
                    renderItem={renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                {this.pagination()}
            </View>
        )
    }

    pagination() {
        const { workoutSlider, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={workoutSlider.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.sliderActiveDotStyle}
                inactiveDotStyle={styles.sliderInactiveDotStyle}
            />
        );
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.primaryColor19SemiBold }}>
                    Програми тренувань
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
    sliderActiveDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding - 15.0
    },
    sliderInactiveDotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4.0,
        backgroundColor: '#9E9E9E',
    },
    sliderPaginationWrapStyle: {
        position: 'absolute',
        bottom: -20.0,
        right: 10.0,
    },
    sliderImageStyle: {
        width: '100%',
        height: 200.0,
        elevation: 2.0,
        marginTop: Sizes.fixPadding * 2.0,
    },
    sliderShadowStyle: {
        width: '100%',
        height: 200.0,
        borderRadius: Sizes.fixPadding,
        borderColor: '#E5E5E5',
        borderWidth: 1.5,
    },
    sliderTextStyle: {
        ...Fonts.whiteColor15Medium,
        position: 'absolute',
        left: 10.0,
        bottom: 10.0,
    },
    homeWorkoutsImageStyle: {
        width: 130,
        height: 200.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    homeWorkoutsShadowStyle: {
        width: 130,
        height: 200.0,
        borderRadius: Sizes.fixPadding,
        borderColor: '#E5E5E5',
        borderWidth: 1.5,
    },
    homeWorkoutsDescriptionStyle: {
        width: 110,
        ...Fonts.whiteColor14Medium,
        position: 'absolute',
        left: 10.0,
        bottom: 10.0,
    },
    workoutsPlansImageStyle: {
        width: 130,
        height: 200.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    workoutsPlansShadowStyle: {
        width: 130,
        height: 200.0,
        borderRadius: Sizes.fixPadding,
        borderColor: '#E5E5E5',
        borderWidth: 1.5,
    },
    workoutsPlansDescriptionStyle: {
        width: 110,
        ...Fonts.whiteColor14Medium,
        position: 'absolute',
        left: 10.0,
        bottom: 10.0,
    },

    freeDaysWrapStyle: {
        marginTop: Sizes.fixPadding,
        backgroundColor: '#222141',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 4.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center'
    },
    popularWorkoutsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        borderRadius: Sizes.fixPadding * 2.0,
        width: 175.0,
        borderColor: '#E5E5E5',
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding - 8.0,
    },
    popularWorkoutsImageStyle: {
        height: 165.0,
        width: 175.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0
    },
    popularTrainersWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        borderRadius: Sizes.fixPadding * 2.0,
        width: 175.0,
        borderColor: '#E5E5E5',
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding - 8.0,
    },
    popularTrainersImageStyle: {
        height: 165.0,
        width: 173.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
    }
})

export default withNavigation(WorkoutScreen);