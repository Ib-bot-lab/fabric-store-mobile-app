import { clearUserFromStorage } from "../utils/storage";
import {
  account,
  databases,
  ID,
  Query,
  DATABASE_ID,
  USERS_COLLECTION_ID,
} from "./appwriteConfig";

// Login user
export const login = async (phone, password) => {
  console.log("Attempting login with:", `${phone}`);
  try {
    // Use the correct method name
    const session = await account.createEmailPasswordSession(
      `${phone}`,
      password
    );

    console.log("Login successful");
    return session;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Register new user
export const signUp = async (phone, password, name, bio) => {
  try {
    console.log("Starting registration process...");

    // Create account in Appwrite
    const user = await account.create(ID.unique(), `${phone}`, password, name);

    console.log("Appwrite user created:", user.$id);

    // Create user profile in database
    const userProfile = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        name: name,
        phone: phone,
        bio: bio,
        createdAt: new Date().toISOString(),
      }
    );

    console.log("User profile created in database");
    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    console.log("Current Appwrite user:", user);

    // Get user profile from database
    const userProfile = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("userId", user.$id)]
    );

    if (userProfile.documents.length > 0) {
      const mergedUser = {
        ...user,
        ...userProfile.documents[0],
      };
      console.log("Merged user data:", mergedUser);
      return mergedUser;
    }

    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};

// Logout user
export const logout = async () => {
  try {
    await account.deleteSession("current");
    await clearUserFromStorage();

    console.log("Logout successful");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Check if user has active session
export const getCurrentSession = async () => {
  try {
    const session = await account.getSession("current");
    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
};
