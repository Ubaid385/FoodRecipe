import { useContext, useState } from "react";

import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { RecipeContext } from "../context/RecipeContext";

const AddRecipeScreen = ({ navigation, route }) => {
  const { addRecipe, updateRecipe } = useContext(RecipeContext);

  const editingRecipe = route.params?.recipe;

  const [name, setName] = useState(editingRecipe?.name || "");

  const [category, setCategory] = useState(editingRecipe?.category || "Dinner");

  const [image, setImage] = useState(editingRecipe?.image || "");

  const [ingredients, setIngredients] = useState(
    editingRecipe?.ingredients?.join("\n") || "",
  );

  const [steps, setSteps] = useState(editingRecipe?.steps?.join("\n") || "");

  const [prepTime, setPrepTime] = useState(editingRecipe?.prepTime || "30 min");

  const [servings, setServings] = useState(editingRecipe?.servings || "2");

  const [calories, setCalories] = useState(editingRecipe?.calories || "400");

  const [difficulty, setDifficulty] = useState(
    editingRecipe?.difficulty || "Easy",
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !ingredients || !steps) {
      alert("Please fill in all required fields.");
      return;
    }

    const recipeData = {
      name,
      category,
      image:
        image || "https://images.unsplash.com/photo-1547592180-85f173990554",
      ingredients: ingredients.split("\n").filter(Boolean),
      steps: steps.split("\n").filter(Boolean),
      prepTime,
      servings,
      calories,
      difficulty,
    };

    if (editingRecipe) {
      await updateRecipe(editingRecipe.id, recipeData);
    } else {
      await addRecipe(recipeData);
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        {editingRecipe ? "Edit Recipe" : "Add New Recipe"}
      </Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <Text>📷 Upload Dish Image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Recipe Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TextInput
        placeholder="Ingredients - one per line"
        value={ingredients}
        onChangeText={setIngredients}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <TextInput
        placeholder="Steps - one per line"
        value={steps}
        onChangeText={setSteps}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <TextInput
        placeholder="Preparation Time"
        value={prepTime}
        onChangeText={setPrepTime}
        style={styles.input}
      />

      <TextInput
        placeholder="Servings"
        value={servings}
        onChangeText={setServings}
        style={styles.input}
      />

      <TextInput
        placeholder="Calories"
        value={calories}
        onChangeText={setCalories}
        style={styles.input}
      />

      <TextInput
        placeholder="Difficulty"
        value={difficulty}
        onChangeText={setDifficulty}
        style={styles.input}
      />

      <TouchableOpacity style={styles.publishButton} onPress={handleSubmit}>
        <Text style={styles.publishText}>
          {editingRecipe ? "Update Recipe" : "Publish Recipe"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddRecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  back: {
    fontSize: 18,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  imagePicker: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },

  preview: {
    width: "100%",
    height: "100%",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },

  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },

  publishButton: {
    backgroundColor: "#ff7043",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },

  publishText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
