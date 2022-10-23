import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import { Champion } from "../models/champion";
import { loadChampions } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ChampionItemMemoized } from "./ChampionItem";
import { SearchBar } from "./SearchBar";

export type ChampionListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChampionList"
>;

const renderItem = ({ item }) => <ChampionItemMemoized champion={item} />;
const itemSeparator = () => <View style={styles.separator} />;
const keyExtractor: (item: any, index: number) => string = (item) =>
  item.id.toString();
const itemLayout = (
  _data: any[],
  index: number
): { length: number; offset: number; index: number } => ({
  length: 52,
  offset: 52 * index,
  index,
});

export function ChampionList() {
  // Redux state and dispatch
  const champions = useAppSelector((state) => state.champions);
  const isLoading = useAppSelector((state) => state.isLoading);
  const dispatch = useAppDispatch();

  const [championsFiltered, setChampionsFiltered] = useState<Champion[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const newChampionsFiltered = useMemo(() => {
    if (searchText === "") {
      return champions;
    }

    return champions.filter((champion: Champion) =>
      champion.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [champions, searchText]);

  useEffect(() => {
    dispatch(loadChampions());
  }, []);

  useEffect(() => {
    setChampionsFiltered(newChampionsFiltered);
  }, [newChampionsFiltered]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={championsFiltered}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        refreshing={isLoading}
        getItemLayout={itemLayout}
        initialNumToRender={10}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(loadChampions())}
          />
        }
        contentContainerStyle={{ paddingBottom: 52 }}
        ListHeaderComponent={
          <>
            <SearchBar
              value={searchText}
              onChangeText={(text: string) => setSearchText(text)}
            />
            <View style={styles.separator} />
          </>
        }
        stickyHeaderIndices={[0]}
        maxToRenderPerBatch={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000814",
  },
  list: {
    padding: 32,
  },
  separator: {
    height: 16,
  },
});
