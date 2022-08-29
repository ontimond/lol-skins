import { Route } from "@react-navigation/native";
import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { Champion } from "../models/champion";

export function ChampionDetail({
  route,
  navigation,
}: {
  route: Route<"championDetails", { champion: Champion }>;
  navigation: any;
}) {
  const { champion } = route.params;

  return (
    <ScrollView>
      <Image
        source={{ uri: champion.image.full }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{champion.name}</Text>
      <Text>{champion.title}</Text>

      <View>
        {champion.skins.map((skin) => (
          <>
            <Text>{skin.full}</Text>
            <Image
              source={{ uri: skin.full }}
              style={{ width: 100, height: 100 }}
            />
          </>
        ))}
      </View>
    </ScrollView>
  );
}

export const ChampionDetailMemoized = React.memo(ChampionDetail);
