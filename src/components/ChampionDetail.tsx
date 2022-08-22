import React from "react";
import { View, Image, Text } from "react-native";

export function ChampionDetail({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { champion } = route.params;

  return (
    <View>
      <Image
        source={{ uri: champion.image.full }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{champion.name}</Text>
      <Text>{champion.title}</Text>
    </View>
  );
}
