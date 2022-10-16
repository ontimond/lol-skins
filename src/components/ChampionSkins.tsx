import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useRef } from "react";
import {
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Champion, ChampionSkin } from "../models/champion";

export function ChampionSkins(
  props: NativeStackScreenProps<
    {
      ChampionSkins: { champion: Champion };
    },
    "ChampionSkins"
  >
) {
  const champion = props.route.params.champion as Champion;
  const carouselRef = useRef<Carousel<ChampionSkin>>();

  const [currentSkin, setCurrentSkin] = React.useState(0);

  const updateCurrentSkin = useCallback((index: number) => {
    setCurrentSkin(index);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={{
          uri: champion.skins[currentSkin].splash,
        }}
      >
        <LinearGradient
          style={styles.backgroundGradient}
          colors={["#000814", "transparent", "#000814"]}
        />
      </ImageBackground>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={champion.skins}
          inactiveSlideScale={0.87}
          inactiveSlideOpacity={0.4}
          onSnapToItem={updateCurrentSkin}
          renderItem={({ item: skin, index }) => (
            <>
              <Pressable
                onPress={() => {
                  carouselRef.current.snapToItem(index);
                }}
              >
                <LinearGradient
                  style={styles.loadingImageContainer}
                  colors={["#FFF", "#FFB020"]}
                >
                  <Image
                    style={styles.loadingImage}
                    source={{ uri: skin.loading }}
                  ></Image>
                </LinearGradient>
              </Pressable>
              <Text style={styles.skinName}>{skin.name}</Text>
            </>
          )}
          itemWidth={95}
          sliderWidth={Dimensions.get("window").width}
          vertical={false}
        />
      </View>
    </View>
  );
}

export const ChampionSkinsMemoized = React.memo(ChampionSkins);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000814",
  },
  loadingImageContainer: {
    padding: 1,
  },
  loadingImage: {
    width: "100%",
    height: 168,
    borderWidth: 2,
    borderColor: "#000814",
  },
  background: {
    // width: 989,
    // height: 584,
    width: Dimensions.get("window").width,
    height: undefined,
    aspectRatio: 989 / 584,
  },
  skinName: {
    color: "#8F95B2",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    marginTop: 8,
  },
  backgroundGradient: {
    flex: 1,
  },
  carouselContainer: {
    position: "absolute",
    bottom: 130,
    left: 0,
    width: Dimensions.get("window").width,
  },
});
