import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, View, StyleSheet } from "react-native";
import { Champion } from "../models/champion";
import { ChampionService } from "../services/champion.service";
import { ChampionItem, ChampionItemMemoized } from "./ChampionItem";
import { SearchBar } from "./SearchBar";

export function ChampionList() {
  const championService = new ChampionService();

  const [champions, setChampions] = useState<Champion[]>([]);
  const [championsFiltered, setChampionsFiltered] = useState<Champion[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const loadChampions = useCallback(async () => {
    setIsLoading(true);
    setChampions(await championService.getChampions());
    setIsLoading(false);
  }, []);

  const newChampionsFiltered = useMemo(() => {
    if (searchText === "") {
      return champions;
    }

    return champions.filter((champion) =>
      champion.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [champions, searchText]);

  useEffect(() => {
    loadChampions();
  }, []);

  useEffect(() => {
    setChampionsFiltered(newChampionsFiltered);
  }, [newChampionsFiltered]);

  return (
    <View style={styles.container}>
      <SearchBar onChangeText={(text) => setSearchText(text)} />
      <View style={styles.separator} />
      <FlatList
        data={championsFiltered}
        renderItem={({ item }) => <ChampionItemMemoized champion={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadChampions} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  separator: {
    height: 16,
  },
});
