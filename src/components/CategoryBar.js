import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const CategoryBar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => setSelectedCategory(category)}
          style={[
            styles.category,
            selectedCategory === category && styles.activeCategory,
          ]}
        >
          <Text
            style={[
              styles.text,
              selectedCategory === category && styles.activeText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },

  category: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: "#ff7043",
  },

  text: {
    color: "#333",
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
  },
});
