import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRecipes } from "../../context/RecipesContext";

export default function FavoritesScreen({ navigation }) {
  const { favoriteRecipes, removeFavorite } = useRecipes();
  // const [favorites, setFavorites] = useState([
  //   {
  //     id: 1,
  //     title: "Chocolate Cake",
  //     image: "https://via.placeholder.com/150",
  //     rating: 95,
  //     cookTime: "45 min",
  //     category: "Cakes",
  //     addedDate: "2024-01-15",
  //   },
  //   {
  //     id: 3,
  //     title: "Fresh Orange Juice",
  //     image: "https://via.placeholder.com/150",
  //     rating: 87,
  //     cookTime: "5 min",
  //     category: "Drinks",
  //     addedDate: "2024-01-10",
  //   },
  // ]);

  console.log("hjhjh", favoriteRecipes);

  const handleRemoveFavorite = (recipeId) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this recipe from your favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await removeFavorite(recipeId);
            Alert.alert("Removed", "Recipe removed from your favorites.");
          },
        },
      ]
    );
  };

  if (favoriteRecipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={80} color="#E0E0E0" />
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptyText}>
          Start saving your favorite recipes to see them here!
        </Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={styles.exploreButtonText}>Explore Recipes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.favoritesCount}>
          {favoriteRecipes.length}{" "}
          {favoriteRecipes.length === 1 ? "recipe" : "recipes"} saved
        </Text>

        {favoriteRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.$id}
            style={styles.recipeCard}
            onPress={() => navigation.navigate("RecipeDetail", { recipe })}
          >
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <View style={styles.recipeHeader}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFavorite(recipe.$id)}
                >
                  <Ionicons name="trash" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
              <Text style={styles.recipeCategory}>{recipe.category}</Text>
              <View style={styles.recipeMeta}>
                <View style={styles.rating}>
                  <Ionicons name="heart" size={16} color="#ff0000ff" />
                  <Text style={styles.ratingText}>{recipe.likecount}</Text>
                </View>
                <View style={styles.cookTime}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.cookTimeText}>{recipe.cookTime}</Text>
                </View>
                <Text style={styles.addedDate}>Added {recipe.addedDate}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  clearAllText: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  favoritesCount: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  recipeCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    // padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  recipeImage: {
    width: 90,
    height: 90,
    // borderRadius: 8,
  },
  recipeInfo: {
    flex: 1,
    // marginLeft: 12,
    padding: 10,
  },
  recipeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  recipeCategory: {
    fontSize: 14,
    color: "#FF6B6B",
    marginBottom: 8,
    fontWeight: "500",
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
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
  addedDate: {
    fontSize: 12,
    color: "#999",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  exploreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
