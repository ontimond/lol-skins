import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { ScreenContainer } from "react-native-screens";
import { Champion } from "../models/champion";

export function ChampionItem({ champion }: { champion: Champion }) {
  const navigator = useNavigation();

  const navigateToChampionDetail = () => {
    navigator.navigate("ChampionDetail", { champion });
  };

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      onPress={() => navigateToChampionDetail()}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: champion.image.full }}
          style={styles.container.image}
        />
        <View style={styles.container.info}>
          <Text style={styles.container.info.name}>{champion.name}</Text>
          <Text style={styles.container.info.title}>{champion.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export const ChampionItemMemoized = React.memo(ChampionItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 16,
    image: {
      borderRadius: 8,
      height: 50,
      width: 50,
      marginRight: 16,
    },
    info: {
      borderBottomColor: "#E8E8E8",
      borderBottomWidth: 1,
      paddingBottom: 16,
      flexGrow: 1,
      name: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
      },
      title: {
        fontSize: 14,
        fontFamily: "Inter_400Regular",
      },
    },
  },
});
