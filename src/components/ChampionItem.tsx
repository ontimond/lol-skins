import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Champion } from "../models/champion";

export function ChampionItem({ champion }: { champion: Champion }) {
  const navigator = useNavigation();

  const navigateToChampionDetail = useCallback(() => {
    navigator.navigate("ChampionDetail", { champion });
  }, []);

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      onPress={() => navigateToChampionDetail()}
    >
      <ImageBackground
        style={styles.background}
        imageStyle={styles.backgroundImage}
        source={{ uri: champion.image.splash }}
      >
        <View style={styles.container}>
          <Image source={{ uri: champion.image.full }} style={styles.image} />
          <Text style={styles.name}>{champion.name}</Text>
        </View>
      </ImageBackground>
    </TouchableHighlight>
  );
}

export const ChampionItemMemoized = React.memo(ChampionItem);

const styles = StyleSheet.create({
  background: {
    borderRadius: 52,
    overflow: "hidden",
  },
  backgroundImage: {
    borderColor: "#474D6680",
    borderWidth: 0.5,
    borderRadius: 52,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000080",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingLeft: 4,
    paddingRight: 22,
  },
  image: {
    borderColor: "#474D6680",
    borderWidth: 0.5,
    borderRadius: 52,
    height: 44,
    width: 44,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#FFFFFF",
  },
});
