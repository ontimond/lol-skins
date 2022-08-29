import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Champion } from "../models/champion";
import { ChampionService } from "../services/champion.service";
import { ChampionItem } from "./ChampionItem";

export function ChampionList() {
  const championService = new ChampionService();

  const [champions, setChampions] = useState<Champion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadChampions = useCallback(async () => {
    setIsLoading(true);
    setChampions(await championService.getChampions());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadChampions();
  }, []);

  return (
    <FlatList
      data={champions}
      renderItem={({ item }) => <ChampionItem champion={item} />}
      keyExtractor={(item) => item.id.toString()}
      refreshing={isLoading}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadChampions} />
      }
    />
  );
}
