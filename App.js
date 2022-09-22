import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ChampionDetailMemoized } from "./src/components/ChampionDetail";
import { ChampionList } from "./src/components/ChampionList";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const onReady = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator initialRouteName="ChampionList">
        <Stack.Screen
          name="ChampionList"
          component={ChampionList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChampionDetail"
          component={ChampionDetailMemoized}
          options={{
            title: "Profile",
            headerTitleStyle: {
              ...styles.headerTitleStyle,
              ...styles.headerTitleStyleDetail,
            },
            headerTransparent: true,
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitleStyleDetail: {
    color: "white",
  },
});
