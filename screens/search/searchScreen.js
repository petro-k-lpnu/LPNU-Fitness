import React from "react";
import { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';

const recentSearchesList = [
    {
        id: '1',
        search: 'Користь йоги',
    },
    {
        id: '2',
        search: 'Вправи для внутрішньої частини стегна',
    },
    {
        id: '3',
        search: 'Ранкова гімнастика',
    },
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


class SearchScreen extends Component {

    state = {
        isSearchFocus: false
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.searchTextField()}
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {this.recentSearchesTitle()}
                            </>
                        }
                        data={recentSearchesList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: Sizes.fixPadding * 7.0,
                            paddingTop: Sizes.fixPadding * 2.0
                        }}
                        ListFooterComponent={
                            <>
                                {this.title({ title: 'Популярні тренування' })}
                                {this.popularWorkouts()}
                            </>
                        }
                    />
                </View>
            </SafeAreaView>
        )
    }

    renderItem = ({ item, index }) => (
        <View style={{ ...styles.recentSearchesWrapStyle, marginBottom: index == recentSearchesList.length - 1 ? 0.0 : Sizes.fixPadding + 5.0, }}>
            <MaterialCommunityIcons name="history" size={18} color={Colors.grayColor} />
            <Text style={{ ...Fonts.primaryColor14Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                {item.search}
            </Text>
        </View>
    )

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

    recentSearchesTitle() {
        return (
            <Text style={{
                ...Fonts.grayColor16SemiBold,
                marginBottom: Sizes.fixPadding + 5.0,
                marginHorizontal: Sizes.fixPadding * 2.0
            }}>
                Історія
            </Text>
        )
    }

    searchTextField() {
        return (
            <View style={styles.searchTextFieldWrapStyle}>
                <MaterialIcons name="search" size={24} color={this.state.isSearchFocus ? Colors.blueColor : 'gray'} />
                <TextInput
                    placeholder="Пошук вправ та порад"
                    style={{
                        flex: 1, ...Fonts.blackColor14Medium,
                        marginLeft: Sizes.fixPadding,
                    }}
                    selectionColor={Colors.blueColor}
                    onFocus={() => this.setState({ isSearchFocus: true })}
                    onBlur={() => this.setState({ isSearchFocus: false })}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchTextFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
    },
    recentSearchesWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0
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

export default withNavigation(SearchScreen);