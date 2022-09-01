import { Route } from "@react-navigation/native";
import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Champion } from "../models/champion";
import { ChampionService } from "../services/champion.service";

export function ChampionDetail({
  route,
  navigation,
}: {
  route: Route<"championDetails", { champion: Champion }>;
  navigation: any;
}) {
  const { champion } = route.params;

  // Get curren width and height of the screen
  const { width } = Dimensions.get("window");

  return (
    <ScrollView>
      <FlatList
        data={champion.skins}
        renderItem={(skin) => (
          // Image with text on the left
          <ImageBackground
            source={{ uri: skin.item.full }}
            style={{
              width,
              height: 168,
              padding: 12,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "300",
                fontSize: 24,
              }}
            >
              {skin.item.name}
            </Text>
          </ImageBackground>
        )}
        keyExtractor={(skin) => skin.id.toString()}
      ></FlatList>
    </ScrollView>
  );
}

export const ChampionDetailMemoized = React.memo(ChampionDetail);
