import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SocialShareScreen({ navigation, route }) {
  const { recipe } = route.params;
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const socialPlatforms = [
    {
      id: 1,
      name: "Facebook",
      icon: "logo-facebook",
      color: "#1877F2",
      description: "Share on your timeline",
    },
    {
      id: 2,
      name: "Twitter",
      icon: "logo-twitter",
      color: "#1DA1F2",
      description: "Tweet to your followers",
    },
    {
      id: 3,
      name: "Instagram",
      icon: "logo-instagram",
      color: "#E4405F",
      description: "Share in your story",
    },
    {
      id: 4,
      name: "WhatsApp",
      icon: "logo-whatsapp",
      color: "#25D366",
      description: "Send to friends",
    },
    {
      id: 5,
      name: "Gmail",
      icon: "mail",
      color: "#EA4335",
      description: "Email recipe",
    },
    {
      id: 6,
      name: "Copy Link",
      icon: "link",
      color: "#666666",
      description: "Copy recipe link",
    },
  ];

  const handleShare = async (platform) => {
    setSelectedPlatform(platform.id);

    try {
      const shareMessage = `Check out this amazing recipe: ${recipe.title}\n\nRating: ${recipe.rating}/100\nCook Time: ${recipe.cookTime}\n\nDownload RecipeApp for more great recipes!`;
      const shareUrl = "https://recipeapp.com/recipe/" + recipe.id;

      switch (platform.name) {
        case "Facebook":
          // Simulate Facebook share
          Alert.alert(
            "Shared on Facebook",
            "Recipe shared successfully on your Facebook timeline!"
          );
          break;

        case "Twitter":
          // Simulate Twitter share
          Alert.alert("Shared on Twitter", "Recipe tweeted successfully!");
          break;

        case "Instagram":
          // Simulate Instagram share
          Alert.alert(
            "Shared on Instagram",
            "Recipe shared to your Instagram story!"
          );
          break;

        case "WhatsApp":
          // Simulate WhatsApp share
          Alert.alert("Shared on WhatsApp", "Recipe sent via WhatsApp!");
          break;

        case "Gmail":
          // Simulate Gmail share
          Alert.alert("Email Sent", "Recipe emailed successfully!");
          break;

        case "Copy Link":
          // Copy to clipboard
          Alert.alert("Link Copied", "Recipe link copied to clipboard!");
          break;

        default:
          // Generic share
          await Share.share({
            message: shareMessage,
            url: shareUrl,
            title: recipe.title,
          });
      }

      // Simulate API call delay
      setTimeout(() => {
        setSelectedPlatform(null);
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to share recipe. Please try again.");
      setSelectedPlatform(null);
    }
  };

  const shareStats = {
    totalShares: 156,
    platformShares: {
      facebook: 67,
      twitter: 42,
      instagram: 28,
      whatsapp: 19,
    },
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
        <Text style={styles.headerTitle}>Share Recipe</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recipe Preview */}
        <View style={styles.recipePreview}>
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <View style={styles.recipeMeta}>
              <View style={styles.rating}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{recipe.rating}/100</Text>
              </View>
              <Text style={styles.cookTime}>⏱️ {recipe.cookTime}</Text>
            </View>
          </View>
        </View>

        {/* Share Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Share Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{shareStats.totalShares}</Text>
              <Text style={styles.statLabel}>Total Shares</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {shareStats.platformShares.facebook}
              </Text>
              <Text style={styles.statLabel}>Facebook</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {shareStats.platformShares.twitter}
              </Text>
              <Text style={styles.statLabel}>Twitter</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {shareStats.platformShares.instagram}
              </Text>
              <Text style={styles.statLabel}>Instagram</Text>
            </View>
          </View>
        </View>

        {/* Share Platforms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Share On</Text>
          <Text style={styles.sectionSubtitle}>
            Choose how you want to share this recipe
          </Text>

          <View style={styles.platformsGrid}>
            {socialPlatforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                style={[
                  styles.platformCard,
                  selectedPlatform === platform.id &&
                    styles.platformCardSelected,
                ]}
                onPress={() => handleShare(platform)}
                disabled={selectedPlatform !== null}
              >
                <View
                  style={[
                    styles.platformIcon,
                    { backgroundColor: platform.color },
                  ]}
                >
                  <Ionicons name={platform.icon} size={24} color="white" />
                </View>
                <Text style={styles.platformName}>{platform.name}</Text>
                <Text style={styles.platformDescription}>
                  {platform.description}
                </Text>

                {selectedPlatform === platform.id && (
                  <View style={styles.sharingOverlay}>
                    <Ionicons
                      name="checkmark-circle"
                      size={32}
                      color="#4ECDC4"
                    />
                    <Text style={styles.sharingText}>Shared!</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Share Message */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Message</Text>
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>
              "Check out this amazing {recipe.title} recipe! 🍳\n\n" "Rating:{" "}
              {recipe.rating}/100 ⭐\n" "Cook Time: {recipe.cookTime} ⏱️\n\n"
              "Download RecipeApp for more delicious recipes! 👇"
            </Text>
          </View>
          <TouchableOpacity style={styles.copyMessageButton}>
            <Ionicons name="copy-outline" size={20} color="#666" />
            <Text style={styles.copyMessageText}>Copy Message</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Shares */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Shared With</Text>
          <View style={styles.recentShares}>
            <View style={styles.recentShareItem}>
              <Image
                source={{ uri: "https://via.placeholder.com/40" }}
                style={styles.avatar}
              />
              <View style={styles.recentShareInfo}>
                <Text style={styles.recentShareName}>Sarah Johnson</Text>
                <Text style={styles.recentShareTime}>2 hours ago</Text>
              </View>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
            </View>

            <View style={styles.recentShareItem}>
              <Image
                source={{ uri: "https://via.placeholder.com/40" }}
                style={styles.avatar}
              />
              <View style={styles.recentShareInfo}>
                <Text style={styles.recentShareName}>Mike Chen</Text>
                <Text style={styles.recentShareTime}>5 hours ago</Text>
              </View>
              <Ionicons name="logo-twitter" size={20} color="#1DA1F2" />
            </View>
          </View>
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
  content: {
    flex: 1,
  },
  recipePreview: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
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
    fontSize: 14,
    color: "#666",
  },
  cookTime: {
    fontSize: 14,
    color: "#666",
  },
  statsSection: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  statItem: {
    alignItems: "center",
    padding: 16,
    margin: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  platformsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  platformCard: {
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 20,
    margin: 8,
    width: "45%",
    position: "relative",
    borderWidth: 2,
    borderColor: "transparent",
  },
  platformCardSelected: {
    borderColor: "#4ECDC4",
    backgroundColor: "#F0F9F8",
  },
  platformIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  platformName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  platformDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  sharingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sharingText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#4ECDC4",
  },
  messageBox: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  messageText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  copyMessageButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    padding: 8,
  },
  copyMessageText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  recentShares: {
    marginTop: 8,
  },
  recentShareItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  recentShareInfo: {
    flex: 1,
  },
  recentShareName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  recentShareTime: {
    fontSize: 12,
    color: "#666",
  },
});
