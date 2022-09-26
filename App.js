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
import { StyleSheet } from "react-native";
import { ChampionDetailConnected } from "./src/components/ChampionDetail";
import { ChampionListConnected } from "./src/components/ChampionList";
import { ChampionSkins } from "./src/components/ChampionSkins";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

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
    <Provider store={store}>
      <NavigationContainer onReady={onReady}>
        <Stack.Navigator initialRouteName="ChampionList">
          <Stack.Screen
            name="ChampionList"
            component={ChampionListConnected}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChampionDetail"
            component={ChampionDetailConnected}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChampionSkins"
            component={ChampionSkins}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
