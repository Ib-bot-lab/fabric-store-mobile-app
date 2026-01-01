import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Share,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useRecipes } from "../../context/RecipesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecipeDetailScreen({ navigation, route }) {
  const { recipe } = route.params;
  const { addFavorite, favorites, likeRecipe } = useRecipes();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkLiked = async () => {
      const liked = await AsyncStorage.getItem(`liked_${recipe.$id}`);
      if (liked === "true") setIsLiked(true);
    };
    checkLiked();
  }, []);

  const handleLike = async () => {
    if (isLiked) return; // prevent double-like

    await likeRecipe(recipe.$id);
    setIsLiked(true); // updates UI instantly
  };

  console.log("hjhjllllll", favorites);

  const { user, setUser } = useAuth();

  const isFavorited = favorites.some((fav) => fav.recipeId === recipe.$id);

  const handleAddToFav = () => {
    console.log("hhhh", user.$id, recipe.$id);
    addFavorite(recipe.$id);
  };

  const instructionsArray = recipe.instructions
    ? JSON.parse(recipe.instructions)
    : [];

  const ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : [];

  const handleShare = async () => {
    try {
      const ingredientsList = ingredients.join(", ");
      const instructionsList = instructionsArray
        .map((step, index) => `${index + 1}. ${step}`)
        .join("\n");

      const message = `
🍽️ *${recipe.title}*

📌 Category: ${recipe.category}
❤️ Likes: ${recipe.likecount}

📝 Description:
${recipe.desc}

🥗 Ingredients:
${ingredientsList}

👨‍🍳 Instructions:
${instructionsList}

⏱ Prep Time: ${recipe.prepTime}
🔥 Cook Time: ${recipe.cookTime}
👥 Servings: ${recipe.servings}
⭐ Difficulty: ${recipe.difficulty}
    `;

      await Share.share({
        message,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share recipe");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Recipe Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Recipe Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="heart" size={20} color="#d62a2aff" />
          <Text style={styles.rating}>{recipe.likecount}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{recipe.category}</Text>
        </View>
        <Text style={styles.bb}>{recipe.desc}</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text style={styles.statValue}>{recipe.prepTime}</Text>
          <Text style={styles.statLabel}>Prep Time</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="speedometer-outline" size={20} color="#666" />
          <Text style={styles.statValue}>{recipe.servings}</Text>
          <Text style={styles.statLabel}>Servins</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="people-outline" size={20} color="#666" />
          <Text style={styles.statValue}>{recipe.difficulty}</Text>
          <Text style={styles.statLabel}>Difficulty</Text>
        </View>
        <TouchableOpacity style={styles.stat}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text style={styles.statValue}>{recipe.cookTime} min</Text>
          <Text style={styles.statLabel}>Cook Time</Text>
        </TouchableOpacity>
      </View>

      {/* Ingredients */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsList}>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={styles.ingredientDot} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <View style={styles.instructionsList}>
          {instructionsArray.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Nutrition */}

      {/* Action Buttons */}
      {user.$id !== recipe.userId && !isFavorited && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleLike}
            disabled={isLiked}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? "#FF0000" : "#FF6B6B"}
            />
            <Text style={styles.saveButtonText}>
              {isLiked ? "Liked" : "Like"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cookButton} onPress={handleAddToFav}>
            <Ionicons name="bookmark-outline" size={20} color="#fff" />
            <Text style={styles.cookButtonText}>Add to favorite</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Ionicons name="share-social-outline" size={20} color="#333" />
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    top: 50,
    right: 60,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  imageContainer: {
    position: "relative",
  },
  recipeImage: {
    width: "100%",
    height: 300,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 6,
  },
  reviews: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  author: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  servingsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  servingsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  servingsControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  servingsButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  servingsCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  ingredientsList: {
    marginLeft: -8,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6B6B",
    marginTop: 6,
    marginRight: 12,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  instructionsList: {
    marginLeft: -8,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  instructionNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  instructionNumberText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    marginTop: 10,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 12,
    padding: 16,
    marginRight: 10,
  },
  saveButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  cookButton: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    padding: 16,
  },
  cookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  shareButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
});
