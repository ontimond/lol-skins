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
      <View>
        <Image
          source={{ uri: champion.image.full }}
          style={{ width: 30, height: 30 }}
        />
        <Text>{champion.name}</Text>
        <Text>{champion.title}</Text>
      </View>
    </TouchableHighlight>
  );
}
