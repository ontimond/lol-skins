import React from "react";
import {
  Text,
  FlatList,
  Dimensions,
  ImageBackground,
  useWindowDimensions,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Champion } from "../models/champion";

export function SkinList(props) {
  const champion = props.route.params.champion as Champion;

  return (
    <SafeAreaView>
      <Carousel
        layout="stack"
        layoutCardOffset={28}
        data={champion.skins}
        renderItem={(skin) => (
          <>
            <Image
              source={{ uri: skin.item.full }}
              style={styles.skinImage}
            ></Image>
            <Text style={styles.skinName}>{skin.item.name}</Text>
          </>
        )}
        itemWidth={useWindowDimensions().width}
        sliderWidth={useWindowDimensions().width}
        vertical={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  skinImage: {
    width: Dimensions.get("window").width - 32 - 28,
    height: "100%",
    resizeMode: "cover",
    shadowColor: "#656565",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderRadius: 10,
  },
  skinName: {
    fontFamily: "Inter_500Medium",
    fontSize: 24,
    textTransform: "Capitalize",
    color: "#FFFFFF",
    position: "absolute",
    bottom: 16,
    left: 16,
  },
});
