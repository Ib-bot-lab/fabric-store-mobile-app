import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeCard({
  recipe,
  onPress,
  onFavorite,
  showFavorite = true,
  size = "medium",
}) {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    if (onFavorite) {
      onFavorite(recipe.id, !isFavorite);
    }
  };

  const cardSizes = {
    small: {
      width: 150,
      imageHeight: 100,
      padding: 8,
    },
    medium: {
      width: 200,
      imageHeight: 120,
      padding: 12,
    },
    large: {
      width: "100%",
      imageHeight: 150,
      padding: 16,
    },
  };

  const sizeConfig = cardSizes[size];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { width: sizeConfig.width, padding: sizeConfig.padding },
      ]}
      onPress={onPress}
    >
      <Image
        source={{ uri: recipe.image }}
        style={[styles.image, { height: sizeConfig.imageHeight }]}
      />

      {showFavorite && (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#FF6B6B" : "white"}
          />
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>

        <View style={styles.meta}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{recipe.rating}</Text>
          </View>

          <View style={styles.time}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.timeText}>{recipe.cookTime}</Text>
          </View>
        </View>

        {recipe.category && (
          <Text style={styles.category}>{recipe.category}</Text>
        )}

        {recipe.ingredients && size === "large" && (
          <View style={styles.ingredients}>
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
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 6,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    lineHeight: 18,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
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
  time: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  category: {
    fontSize: 12,
    color: "#FF6B6B",
    fontWeight: "500",
  },
  ingredients: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 8,
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
