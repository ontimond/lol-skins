import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Share,
  Linking,
} from "react-native";
import { Champion } from "../models/champion";
import { addToFavorites, removeFromFavorites } from "../redux/actions";
import HeartIcon from "../icons/Heart";
import HeartBrokenIcon from "../icons/HeartBroken";
import ShareIcon from "../icons/Share";
import RateIcon from "../icons/Rate";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type Props = NativeStackScreenProps<RootStackParamList, "ChampionDetail">;

export function ChampionDetail({ route, navigation }: Props) {
  // Champion passed from the previous screen
  const { champion } = route.params;

  // Redux state and dispatch
  const favoriteChampions = useAppSelector((state) => state.favoriteChampions);
  const dispatch = useAppDispatch();

  const goToSkins = useCallback(() => {
    // Send to the skins screen
    navigation.navigate("ChampionSkins", { champion });
  }, [navigation]);

  // Check if the champion is in the favorites
  // memoize the result
  const isFavorite = useMemo(() => {
    return favoriteChampions.some(
      (favChampion: Champion) => favChampion.id === champion.id
    );
  }, [favoriteChampions, champion]);

  const onFavoritePress = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFromFavorites(champion.id));
    } else {
      dispatch(addToFavorites(champion.id));
    }
  }, [isFavorite]);

  const OPGGUrl = useMemo(() => {
    return `https://www.op.gg/champions/${champion.name}`;
  }, [champion]);

  const onSharePress = useCallback(async () => {
    const result = await Share.share({
      message: `Check out ${champion.name} on League of Legends!`,
      url: OPGGUrl,
    });

    if (result.action === Share.sharedAction) {
      alert("Shared!");
    }
  }, []);

  const onRatePress = useCallback(async () => {
    const url = OPGGUrl;

    if (Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  }, [champion]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: champion.image.splash }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["transparent", "#000814"]}
          style={{ flex: 1 }}
        />
      </ImageBackground>
      <View style={styles.separator} />
      <Text style={styles.title}>{champion.title}</Text>
      <View style={styles.separator} />
      <Text style={styles.name}>{champion.name}</Text>
      <View style={styles.separator} />
      <Pressable style={styles.button} onPress={goToSkins}>
        <Text style={styles.buttonText}>Skins</Text>
      </Pressable>
      <View style={styles.separator} />
      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => onFavoritePress()}
        >
          {isFavorite ? <HeartIcon /> : <HeartBrokenIcon />}
          <Text style={styles.actionButtonText}>Like</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => onSharePress()}>
          <ShareIcon />
          <Text style={styles.actionButtonText}>Share</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => onRatePress()}>
          <RateIcon />
          <Text style={styles.actionButtonText}>Rate</Text>
        </Pressable>
      </View>
      <View style={styles.separator} />
      <View style={styles.divider} />
      <View style={styles.separator} />
      <Text style={styles.loreTitle}>Lore</Text>
      <View style={styles.separator} />
      <Text style={styles.loreText}>{champion.lore}</Text>
    </View>
  );
}

export const ChampionDetailMemoized = React.memo(ChampionDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000814",
    paddingTop: 221,
    paddingHorizontal: 32,
    overflow: "hidden",
  },
  imageContainer: {
    shadowColor: "#656565",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  backgroundImage: {
    position: "absolute",
    width: 574,
    height: 339,
    zIndex: -1,
  },
  name: {
    fontSize: 32,
    fontFamily: "Inter_600SemiBold",
    alignSelf: "flex-start",
    color: "#fff",
  },
  title: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#C1C4D6",
    alignSelf: "flex-start",
  },
  button: ({ pressed }) => ({
    backgroundColor: pressed ? "#1F3D99" : "#3366FF",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  }),
  buttonText: {
    color: "#fff",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  separator: {
    height: 8,
  },
  actions: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  actionButtonText: {
    color: "#fff",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    marginTop: 8,
  },
  divider: {
    backgroundColor: "#C1C4D6",
    height: 0.3,
    alignSelf: "stretch",
  },
  loreTitle: {
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  loreText: {
    color: "#BDBDBD",
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    alignSelf: "flex-start",
  },
});
