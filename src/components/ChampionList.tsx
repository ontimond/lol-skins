import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { connect } from "react-redux";
import { Champion } from "../models/champion";
import { loadChampions } from "../redux/actions";
import { ChampionItemMemoized } from "./ChampionItem";
import { SearchBar } from "./SearchBar";

export function ChampionList(props) {
  const { champions, isLoading, loadChampions } = props;

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
    loadChampions();
  }, []);

  useEffect(() => {
    setChampionsFiltered(newChampionsFiltered);
  }, [newChampionsFiltered]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={championsFiltered}
        renderItem={({ item }) => <ChampionItemMemoized champion={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => loadChampions()}
          />
        }
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
    flex: 1,
    padding: 32,
  },
  separator: {
    height: 16,
  },
});

const mapStateToProps = (state: any) => ({
  champions: state.champions,
});

const mapDispatchToProps = (dispatch: any) => ({
  loadChampions: () => dispatch(loadChampions()),
});

export const ChampionListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChampionList);
