import { Asset } from "expo-asset";
import { Route } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Champion } from "../models/champion";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { THREE, Renderer, loadAsync } from "expo-three";

global.THREE = global.THREE || THREE;

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

  const onContextCreate = useCallback(async (gl: ExpoWebGLRenderingContext) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(width, 300);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / 300, 0.1, 1000);

    camera.position.z = 10;

    const obj = await loadAsync(require("./../../assets/FinalBaseMesh.obj"));
    scene.add(obj);
    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  }, []);

  return (
    <View>
      <Text>{champion.name}</Text>
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
            <GLView
              style={{ height: 300, width }}
              onContextCreate={onContextCreate}
            />
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
    </View>
  );
}

export const ChampionDetailMemoized = React.memo(ChampionDetail);
