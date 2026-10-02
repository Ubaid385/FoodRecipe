import { useContext } from "react";

import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { RecipeContext } from "../context/RecipeContext";

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;

  const { recipes, favorites, toggleFavorite } = useContext(RecipeContext);

  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  const isFavorite = favorites.includes(recipe.id);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{recipe.name}</Text>

          <TouchableOpacity onPress={() => toggleFavorite(recipe.id)}>
            <Text style={styles.heart}>{isFavorite ? "❤️" : "♡"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text>⏱ {recipe.prepTime}</Text>
          <Text>👥 {recipe.servings}</Text>
          <Text>🔥 {recipe.calories}</Text>
          <Text>📊 {recipe.difficulty}</Text>
        </View>

        <Text style={styles.heading}>Ingredients</Text>

        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            • {ingredient}
          </Text>
        ))}

        <Text style={styles.heading}>Instructions</Text>

        {recipe.steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <Text style={styles.stepNumber}>{index + 1}</Text>

            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    padding: 20,
  },

  back: {
    fontSize: 18,
    padding: 15,
  },

  image: {
    width: "100%",
    height: 280,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
  },

  heart: {
    fontSize: 35,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  ingredient: {
    fontSize: 16,
    marginBottom: 8,
  },

  step: {
    flexDirection: "row",
    marginBottom: 15,
  },

  stepNumber: {
    width: 30,
    height: 30,
    backgroundColor: "#ff7043",
    color: "#fff",
    borderRadius: 15,
    textAlign: "center",
    paddingTop: 5,
    fontWeight: "bold",
  },

  stepText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 23,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
