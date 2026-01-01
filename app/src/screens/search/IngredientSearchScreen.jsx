import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IngredientSearchScreen({ navigation, route }) {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const ingredients = [
    { name: "Potato", icon: "🥔", color: "#F0E68C" },
    { name: "Tomato", icon: "🍅", color: "#FF6347" },
    { name: "Mushroom", icon: "🍄", color: "#8B4513" },
    { name: "Broccoli", icon: "🥦", color: "#32CD32" },
    { name: "Eggplant", icon: "🍆", color: "#8A2BE2" },
    { name: "Chicken", icon: "🍗", color: "#FFA07A" },
    { name: "Beef", icon: "🥩", color: "#8B0000" },
    { name: "Fish", icon: "🐟", color: "#4682B4" },
    { name: "Rice", icon: "🍚", color: "#FFF8DC" },
    { name: "Pasta", icon: "🍝", color: "#FFE4B5" },
    { name: "Cheese", icon: "🧀", color: "#FFD700" },
    { name: "Eggs", icon: "🥚", color: "#F5F5DC" },
  ];

  const recipes = [
    {
      id: 1,
      title: "Potato Salad",
      image: "https://via.placeholder.com/150",
      rating: 88,
      cookTime: "20 min",
      ingredients: ["Potato", "Tomato"],
    },
    {
      id: 2,
      title: "Mushroom Pasta",
      image: "https://via.placeholder.com/150",
      rating: 92,
      cookTime: "25 min",
      ingredients: ["Mushroom", "Pasta"],
    },
    {
      id: 3,
      title: "Grilled Chicken",
      image: "https://via.placeholder.com/150",
      rating: 95,
      cookTime: "30 min",
      ingredients: ["Chicken", "Broccoli"],
    },
  ];

  const toggleIngredient = (ingredientName) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((item) => item !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const filteredRecipes =
    selectedIngredients.length === 0
      ? recipes
      : recipes.filter((recipe) =>
          selectedIngredients.every((ingredient) =>
            recipe.ingredients.includes(ingredient)
          )
        );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search by Ingredient</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Selected Ingredients */}
        {selectedIngredients.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Ingredients</Text>
            <View style={styles.selectedContainer}>
              {selectedIngredients.map((ingredient, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.selectedChip}
                  onPress={() => toggleIngredient(ingredient)}
                >
                  <Text style={styles.selectedChipText}>{ingredient}</Text>
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.clearAllButton}
                onPress={() => setSelectedIngredients([])}
              >
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Recipes List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedIngredients.length === 0
                ? "All Recipes"
                : "Matching Recipes"}
            </Text>
            <Text style={styles.recipeCount}>
              {filteredRecipes.length} recipes
            </Text>
          </View>

          {filteredRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeCard}
              onPress={() => navigation.navigate("RecipeDetail", { recipe })}
            >
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.ingredientsList}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientTag}>
                      <Text style={styles.ingredientTagText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.recipeMeta}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{recipe.rating}/100</Text>
                  </View>
                  <View style={styles.cookTime}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.cookTimeText}>{recipe.cookTime}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={20} color="#666" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 24,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  selectedChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B6B",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChipText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 6,
  },
  clearAllButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  clearAllText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  ingredientsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  ingredientCard: {
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ingredientSelected: {
    borderWidth: 3,
    borderColor: "#FF6B6B",
  },
  ingredientIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  ingredientName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
  },
  recipeCount: {
    fontSize: 14,
    color: "#666",
  },
  recipeCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  ingredientsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  ingredientTag: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  ingredientTagText: {
    fontSize: 12,
    color: "#666",
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  cookTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  cookTimeText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  favoriteButton: {
    padding: 8,
  },
});
