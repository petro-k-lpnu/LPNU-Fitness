import React, { Component, useState, useRef } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Dimensions, BackHandler, Animated } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const notificationsList = [
    {
        key: '1',
        name: 'Додаток оновлено до версії 1.0',
        description: 'Покращення стабільності роботи додатку',
        iconName: 'notifications'
    },
];

class NotificationScreen extends Component {

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
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <Notification navigation={this.props.navigation} />
                </View>
            </SafeAreaView>
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
                    Сповіщення
                </Text>
            </View>
        )
    }
}

const rowTranslateAnimatedValues = {};

const Notification = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationsList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.name} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 108],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={styles.notificationIconWrapStyle}>
                            <MaterialIcons name={data.item.iconName} size={35} color={Colors.whiteColor} />
                        </View>
                        <View style={{
                            width: width / 1.50,
                            marginLeft: Sizes.fixPadding
                        }}>
                            <Text numberOfLines={2} style={{ ...Fonts.blackColor16Medium }}>
                                {data.item.name}
                            </Text>
                            <Text numberOfLines={2} style={{ ...Fonts.grayColor14Medium }}>
                                {data.item.description}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: Colors.grayColor,
                            height: 1.0,
                            marginTop: Sizes.fixPadding * 2.0,
                        }}
                    />
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    return (
        <View style={{ backgroundColor: '#FAFAFA', flex: 1 }}>
            {listData.length == 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.noItemIconWrapStyle}>
                        <MaterialIcons name="notifications-off" size={50} color={Colors.grayColor} />
                    </View>
                    <Text style={{ ...Fonts.grayColor18SemiBold, marginTop: Sizes.fixPadding * 2.0 }}>
                        No new notifications
                    </Text>
                </View>
                :
                <SwipeListView
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                />
            }
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {snackBarMsg}
                </Text>
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 55.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
    noItemIconWrapStyle: {
        backgroundColor: '#E8E8E8',
        height: 100.0,
        width: 100.0,
        borderRadius: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationIconWrapStyle: {
        height: 70.0,
        width: 70.0,
        borderRadius: 35.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

NotificationScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(NotificationScreen);