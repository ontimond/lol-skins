import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationProp, Route } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { THREE } from "expo-three";
import React, { useCallback } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Champion } from "../models/champion";

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

  const goToSkins = useCallback(() => {
    navigation.navigate("ChampionSkins", { champion });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: champion.image.splash }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["transparent", "#000814"]}
          style={{ flex: 1 }}
        />
      </ImageBackground>
      <View style={styles.separator} />
      <Text style={styles.title}>{champion.title}</Text>
      <View style={styles.separator} />
      <Text style={styles.name}>{champion.name}</Text>
      <View style={styles.separator} />
      <Pressable style={styles.button} onPress={goToSkins}>
        <Text style={styles.buttonText}>Skins</Text>
      </Pressable>
      <View style={styles.separator} />
      <View style={styles.actions}>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Save</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Share</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Rate</Text>
        </Pressable>
      </View>
      <View style={styles.separator} />
      <View style={styles.divider} />
      <View style={styles.separator} />
      <Text style={styles.loreTitle}>Lore</Text>
      <View style={styles.separator} />
      <Text style={styles.loreText}>{champion.lore}</Text>
    </View>
  );
}

export const ChampionDetailMemoized = React.memo(ChampionDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000814",
    paddingTop: 221,
    paddingHorizontal: 32,
    overflow: "hidden",
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
  backgroundImage: {
    position: "absolute",
    width: 574,
    height: 339,
    zIndex: -1,
  },
  name: {
    fontSize: 32,
    fontFamily: "Inter_600SemiBold",
    alignSelf: "flex-start",
    color: "#fff",
  },
  title: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#C1C4D6",
    alignSelf: "flex-start",
  },
  button: ({ pressed }) => ({
    backgroundColor: pressed ? "#1F3D99" : "#3366FF",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  }),
  buttonText: {
    color: "#fff",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  separator: {
    height: 8,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  actionButtonText: {
    color: "#fff",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  divider: {
    backgroundColor: "#C1C4D6",
    height: 0.3,
    alignSelf: "stretch",
  },
  loreTitle: {
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  loreText: {
    color: "#BDBDBD",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    alignSelf: "flex-start",
  },
});
