import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{recipe.name}</Text>

        <Text style={styles.category}>{recipe.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  category: {
    marginTop: 5,
    color: "#777",
  },
});
