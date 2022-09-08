import { TextInput, StyleSheet } from "react-native";

export function SearchBar(props) {
  return (
    <TextInput
      style={styles.container}
      placeholder="Search"
      placeholderTextColor="#BDBDBD"
      onChangeText={(text) => props.onChangeText(text)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 2,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 32,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    borderRadius: 100,
  },
});
