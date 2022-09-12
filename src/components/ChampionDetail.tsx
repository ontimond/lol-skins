import { NavigationProp, Route } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Champion } from "../models/champion";
import { THREE } from "expo-three";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SkinList } from "./SkinList";
import { ChampionStats } from "./ChampionStats";

const Tab = createMaterialTopTabNavigator();

global.THREE = global.THREE || THREE;

export function ChampionImage(props) {
  const champion = props.champion as Champion;

  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: champion.image.full }} style={styles.image} />
    </View>
  );
}

export function ChampionDetail({
  route,
  navigation,
}: {
  route: Route<"championDetails", { champion: Champion }>;
  navigation: NavigationProp<any>;
}) {
  const { champion } = route.params;

  return (
    <View style={styles.container}>
      <ChampionImage champion={champion} />
      <Image
        source={{ uri: champion.image.splash }}
        style={{
          position: "absolute",
          width: useWindowDimensions().width,
          height: 245,
          zIndex: -1,
        }}
        blurRadius={20}
      />
      <Text style={styles.name}>{champion.name}</Text>
      <Text style={styles.title}>{champion.title}</Text>
      <Tab.Navigator
        style={styles.navigator}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#F6F6F6",
            borderWidth: 1,
            borderColor: "#E8E8E8",
            borderRadius: 100,
          },
          tabBarLabelStyle: {
            textTransform: "none",
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "white",
            borderRadius: 100,
            height: "100%",
          },
          tabBarActiveTintColor: "#5DB075",
          tabBarInactiveTintColor: "#BDBDBD",
        }}
        sceneContainerStyle={{
          backgroundColor: "#fff",
          paddingTop: 16,
        }}
      >
        <Tab.Screen
          name="Stats"
          component={ChampionStats}
          initialParams={{ champion }}
        />
        <Tab.Screen
          name="Skins"
          component={SkinList}
          initialParams={{ champion }}
        />
      </Tab.Navigator>
    </View>
  );
}

export const ChampionDetailMemoized = React.memo(ChampionDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: (Platform.OS === "ios" ? 60 : 80) + 32,
    overflow: "visible",
  },
  imageContainer: {
    shadowColor: "#656565",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  image: {
    width: 158,
    height: 158,
    borderRadius: 79,
    borderWidth: 4,
    borderColor: "#fff",
    marginTop: 32,
    marginBottom: 16,
  },
  name: {
    fontSize: 30,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 24,
  },
  navigator: {
    alignSelf: "stretch",
    overflow: "visible",
  },
});
