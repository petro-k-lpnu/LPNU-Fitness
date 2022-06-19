import React from "react";
import { LogBox } from "react-native";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import accountSettingsScreen from "./screens/accountSetting/accountSettingsScreen";
import loginScreen from "./screens/auth/loginScreen";
import registerScreen from "./screens/auth/registerScreen";
import verificationScreen from "./screens/auth/verificationScreen";
import welcomeScreen from "./screens/auth/welcomeScreen";
import healthTipsDetailsScreen from "./screens/healthTipsDetail/healthTipsDetailsScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import splashScreen from "./screens/splashScreen";
import startWorkoutScreen from "./screens/startWorkout/startWorkoutScreen";
import termsOfUseScreen from "./screens/termsOfUse/termsOfUseScreen";
import workoutDetailScreen from "./screens/workoutDetail/workoutDetailScreen";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
]);

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  mainFlow: createSharedElementStackNavigator(
    {
      Splash: splashScreen,
      Welcome: welcomeScreen,
      Login: loginScreen,
      Register: registerScreen,
      Verification: verificationScreen,
      BottomTabBar: bottomTabBarScreen,
      WorkoutDetail: workoutDetailScreen,
      StartWorkout: startWorkoutScreen,
      HealthTipsDetail: healthTipsDetailsScreen,
      AccountSettings: accountSettingsScreen,
      Notifications: notificationsScreen,
      TermsOfUse: termsOfUseScreen,
    },
    {
      initialRouteName: 'BottomTabBar',
    }
  ),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};