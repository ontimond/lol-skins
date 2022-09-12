import { StyleSheet, Image, useWindowDimensions } from "react-native";
import { ChampionList } from "./src/components/ChampionList";
import { ChampionDetailMemoized } from "./src/components/ChampionDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ChampionList"
            component={ChampionList}
            options={{
              title: "Champions",
              headerTitleStyle: styles.headerTitleStyle,
            }}
          />
          <Stack.Screen
            name="ChampionDetail"
            component={ChampionDetailMemoized}
            options={(props) => ({
              title: "Profile",
              headerTitleStyle: {
                ...styles.headerTitleStyle,
                ...styles.headerTitleStyleDetail,
              },
              headerTransparent: true,
              headerShown: true,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 30,
  },
  headerTitleStyleDetail: {
    color: "white",
  },
});
