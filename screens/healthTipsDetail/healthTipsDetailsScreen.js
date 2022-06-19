import React from "react";
import { Component } from "react";
import { SafeAreaView, View, StyleSheet, Text, BackHandler, FlatList, Dimensions, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import CollapsingToolbar from "../../components/sliverAppBarScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

class TrainerDetailScreen extends Component {

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

    item = this.props.navigation.getParam('item');

    state = {
        isFavorite: false,
        showSnackBar: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <View style={{ flex: 1 }}>
                    <CollapsingToolbar
                        toolbarColor={Colors.whiteColor}
                        toolBarMinHeight={55}
                        toolbarMaxHeight={358}
                        src={this.item.image}>
                        <View style={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
                            {this.healthTipNameWithFavoriteInfo()}
                            {this.divider()}
                            {this.descriptionInfo()}
                        </View>
                    </CollapsingToolbar>
                    {this.header()}
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={this.state.showSnackBar}
                        onDismiss={() => this.setState({ showSnackBar: false })}
                    >
                        <Text style={{ ...Fonts.whiteColor13Medium }}>
                            {this.state.isFavorite
                                ?
                                `Added to favorite`
                                :
                                `Remove from favorite`
                            }
                        </Text>
                    </Snackbar>
                </View>
            </SafeAreaView >
        )
    }

    divider() {
        return (
            <View
                style={{
                    backgroundColor: Colors.grayColor, height: 1.5,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding + 5.0,
                }}
            />


        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    style={{
                        width: 24.0,
                    }}
                    color={Colors.blackColor}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text
                    numberOfLines={1}
                    style={{
                        width: width - 120,
                        textAlign: 'left',
                        marginLeft: Sizes.fixPadding * 5.0,
                        alignSelf: 'flex-start',
                        ...Fonts.primaryColor19SemiBold,
                    }}>
                    {this.item.tip}
                </Text>
            </View>
        )
    }

    healthTipNameWithFavoriteInfo() {
        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{
                    ...Fonts.blackColor22SemiBold, width: width - 80,
                }}>
                    {this.item.tip}
                </Text>
            </View>
        )
    }

    descriptionInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 5.0, textAlign: 'justify' }}>
                Внаслідок пандемійних обмежень люди дещо більше часу проводять вдома: хтось - на самоізоляції, хтось працює вдома. А ще тимчасово обмежують роботу фітнес-залів, клубів. Чому б не почати ним займатись вдома? Якщо дозволяє самопочуття і є достатньо простору в помешканні, почати можна з простих вправ.
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 5.0, textAlign: 'justify' }}>
                Всім добре відомо, що прогулянки, біг та ходьба є надзвичайно корисними для здоров'я. Сьогодні ми хочемо поділитись з вами користю та шкодою ходьби по сходах.
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 5.0, textAlign: 'justify' }}>
                Всесвітня організація охорони здоров'я рекомендує 150 хвилин фізичної активності середньої інтенсивності або 75 хвилин інтенсивної фізичної активності на тиждень або комбінацію обох. Цих рекомендацій можна досягти навіть вдома, без спеціального обладнання та з обмеженим простором.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        position: 'absolute',
        top: 15.0,
        left: 20.0,
        right: 20.0,
        width: width - 40.0,
        alignItems: 'center',
    },
    recommendedWorkoutsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        borderRadius: Sizes.fixPadding * 2.0,
        width: 175.0,
        borderColor: '#E5E5E5',
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding - 8.0,
    },
    recommendedWorkoutsImageStyle: {
        height: 165.0,
        width: 175.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
    },
})

TrainerDetailScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(TrainerDetailScreen);