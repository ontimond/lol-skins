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
import { ChampionList } from "./src/components/ChampionList";
import { ChampionSkinsMemoized } from "./src/components/ChampionSkins";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Champion } from "./src/models/champion";
import { ChampionDetailMemoized } from "./src/components/ChampionDetail";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  ChampionList: undefined;
  ChampionDetail: { champion: Champion };
  ChampionSkins: { champion: Champion };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

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
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer onReady={onReady}>
            <RootStack.Navigator initialRouteName="ChampionList">
              <RootStack.Screen
                name="ChampionList"
                component={ChampionList}
                options={screenOptions}
              />
              <RootStack.Screen
                name="ChampionDetail"
                component={ChampionDetailMemoized}
                options={screenOptions}
              />
              <RootStack.Screen
                name="ChampionSkins"
                component={ChampionSkinsMemoized}
                options={screenOptions}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>

      <StatusBar style="light" />
    </>
  );
}
function setStatusBarStyle(arg0: string, arg1: boolean) {
  throw new Error("Function not implemented.");
}
