import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableHighlight } from "react-native";
import { Champion } from "../models/champion";

export function ChampionItem({ champion }: { champion: Champion }) {
  const navigator = useNavigation();

  const navigateToChampionDetail = () => {
    navigator.navigate("ChampionDetail", { champion });
  };

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => navigateToChampionDetail()}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: champion.image.full }}
          style={{
            width: 68,
            height: 68,
          }}
        />
        <View>
          <Text>{champion.name}</Text>
          <Text>{champion.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
