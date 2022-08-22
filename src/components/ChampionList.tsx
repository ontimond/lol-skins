import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Champion } from "../models/champion";
import { ChampionService } from "../services/champion.service";
import { ChampionItem } from "./ChampionItem";

export function ChampionList() {
  const championService = new ChampionService();

  const [champions, setChampions] = useState<Champion[]>([]);

  useEffect(async () => {
    setChampions(await championService.load());
  }, []);

  return (
    <FlatList
      data={champions}
      renderItem={({ item }) => <ChampionItem champion={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
