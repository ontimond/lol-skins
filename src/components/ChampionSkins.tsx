import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { Champion } from "../models/champion";

export function ChampionSkins(props) {
  const champion = props.route.params.champion as Champion;

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        layout="stack"
        data={champion.skins}
        renderItem={(skin) => (
          <>
            <Image
              style={styles.image}
              source={{ uri: skin.item.full }}
            ></Image>
          </>
        )}
        itemWidth={useWindowDimensions().height}
        sliderWidth={useWindowDimensions().width}
        vertical={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000814",
    resizeMode: "cover",
    flex: 1,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
