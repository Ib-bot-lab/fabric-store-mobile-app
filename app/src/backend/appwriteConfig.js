import { Client, Account, Databases, Query, ID, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("68e9673a002ae85be098");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query };

// Database and Collection IDs
export const DATABASE_ID = "68e967b50012633e7777";
export const USERS_COLLECTION_ID = "chats";
export const CHATS_COLLECTION_ID = "messages";
export const MESSAGES_COLLECTION_ID = "users";
export const RECIPES_COLLECTION_ID = "recipes";
export const BUCKET_ID = "691c76d4003aecea7826";
export const FAVORITES_COLLECTION_ID = "favorites";
