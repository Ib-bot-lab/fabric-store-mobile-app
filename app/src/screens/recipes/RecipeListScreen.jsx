import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRecipes } from "../../context/RecipesContext";

export default function RecipeListScreen({ navigation, route }) {
  const [searchQuery, setSearchQuery] = useState(
    route.params?.searchQuery || ""
  );
  const [sortBy, setSortBy] = useState("relevance");

  const { recipes, topRated, createRecipe, updateRecipe, deleteRecipe } =
    useRecipes();

  console.log("ssss", recipes);

  // const filteredRecipes = recipes.filter((recipe) =>
  //   recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredRecipes = recipes.filter((recipe) => {
    const query = searchQuery.toLowerCase();

    // Search by title
    const matchesTitle = recipe.title.toLowerCase().includes(query);

    // Parse ingredients (they are stored as JSON strings)
    let ingredientsArray = [];
    try {
      ingredientsArray = JSON.parse(recipe.ingredients || "[]");
    } catch (e) {
      ingredientsArray = [];
    }

    // Search by ingredients
    const matchesIngredients = ingredientsArray.some((ing) =>
      ing.toLowerCase().includes(query)
    );

    return matchesTitle || matchesIngredients;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "time":
        return parseInt(a.cookTime) - parseInt(b.cookTime);
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const toggleFavorite = (recipeId) => {
    // Handle favorite toggle
    console.log("Toggle favorite:", recipeId);
  };

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
        <Text style={styles.headerTitle}>Search Results</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
      </View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {sortedRecipes.length} recipes found
          {searchQuery && ` for "${searchQuery}"`}
        </Text>
      </View>

      {/* Recipes Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.recipesGrid}>
          {sortedRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.$id}
              style={styles.recipeCard}
              onPress={() => navigation.navigate("RecipeDetail", { recipe })}
            >
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />

              <View style={styles.recipeContent}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeCategory}>{recipe.category}</Text>
                <View style={styles.recipeMeta}>
                  <View style={styles.rating}>
                    <Ionicons name="heart" size={14} color="#ff0000ff" />
                    <Text style={styles.ratingText}>{recipe.likecount}</Text>
                  </View>
                  <View style={styles.cookTime}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.cookTimeText}>{recipe.cookTime}</Text>
                  </View>
                </View>
                {/* <View style={styles.ingredients}>
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <View key={index} style={styles.ingredientTag}>
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <Text style={styles.moreIngredients}>
                      +{recipe.ingredients.length - 3} more
                    </Text>
                  )}
                </View> */}
              </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  resultsCount: {
    fontSize: 16,
    color: "#666",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sortText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recipesGrid: {
    flexDirection: "row",
    marginHorizontal: -8,
    flexWrap: "wrap",
  },
  recipeCard: {
    backgroundColor: "white",
    borderRadius: 12,
    margin: 8,
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: 120,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 6,
  },
  recipeContent: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  recipeCategory: {
    fontSize: 12,
    color: "#FF6B6B",
    marginBottom: 8,
    fontWeight: "500",
  },
  recipeMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
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
  ingredients: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  ingredientTag: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  ingredientText: {
    fontSize: 10,
    color: "#666",
  },
  moreIngredients: {
    fontSize: 10,
    color: "#999",
    fontStyle: "italic",
  },
});
