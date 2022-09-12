import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Champion } from "../models/champion";

export function ChampionStats(props) {
  const champion = props.route.params.champion as Champion;

  return (
    <ScrollView>
      <Text style={styles.loreTitle}>Lore</Text>
      <Text style={styles.loreContent}>{champion.lore + ""}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loreTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 24,
    marginBottom: 16,
  },
  loreContent: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#666666",
  },
});
