import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserToStorage = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    console.log("Error saving user", err);
  }
};

export const getUserFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.log("Error reading user", err);
    return null;
  }
};

export const clearUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (err) {
    console.log("Error clearing user", err);
  }
};
