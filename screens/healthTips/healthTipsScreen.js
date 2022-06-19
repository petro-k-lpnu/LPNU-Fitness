import React from "react";
import { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, BackHandler, TouchableOpacity, FlatList, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const healthTipsList = [
    {
        id: '1',
        image: require('../../assets/images/health_tips/health_tips_2.jpg'),
        tip: 'Слідкуйте за харчуванням',
    },
    {
        id: '2',
        image: require('../../assets/images/health_tips/health_tips_3.jpg'),
        tip: 'Вкладайтесь на 110%',
    },
    {
        id: '3',
        image: require('../../assets/images/health_tips/health_tips_1.jpg'),
        tip: 'Фітнес на самоізоляції',
    },
    {
        id: '4',
        image: require('../../assets/images/health_tips/health_tips_5.jpg'),
        tip: 'Підходьте до тренувань розумно',
    }
];

class HealthTipsScreen extends Component {

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
                    {this.healthTips()}
                </View>
            </SafeAreaView>
        )
    }

    healthTips() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('HealthTipsDetail', { item })}
                style={styles.healthTipsWrapStyle}>
                <Image
                    source={item.image}
                    style={{
                        width: '100%',
                        height: 170.0,
                        borderTopLeftRadius: Sizes.fixPadding * 2.0,
                        borderTopRightRadius: Sizes.fixPadding * 2.0,
                    }}
                    resizeMode="cover"
                />
                <View style={{ paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding + 5.0, }}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        {item.tip}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={healthTipsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding * 12.0,
                }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.primaryColor19SemiBold }}>
                    Поради
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
    healthTipsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        borderRadius: Sizes.fixPadding * 2.0,
        borderColor: '#E5E5E5',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
})

export default withNavigation(HealthTipsScreen);