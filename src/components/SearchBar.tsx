import { BlurView } from "expo-blur";
import { TextInput, StyleSheet } from "react-native";

export function SearchBar(props) {
  return (
    <BlurView tint="dark" style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#D0CAF4"
        onChangeText={(text) => props.onChangeText(text)}
      />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: "hidden",
  },
  input: {
    height: 48,
    backgroundColor: "#5249883D",
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    borderRadius: 4,
    padding: 16,
    color: "#FFFFFF",
  },
});
