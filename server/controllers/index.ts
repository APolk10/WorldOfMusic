import getGlobalAnalyticData from "../models/getGlobalAnalyticData";
import getUser from "../models/getUser";
import getFavorites from "../models/getFavorites";
import logFavorite from "../models/logFavorite";
import removeFavorite from "../models/removeFavorite";
import trackClick from "../models/trackClick";

export const fetchGlobalAnalyticData = () => {
  console.log('controller for fetchGlobalAnalyticData triggered');
}

export const fetchUser = (session_id: string) => {
  console.log('controller for fetchUserProfile triggered');
}

export const getAllFavorites = (user: string) => {
  console.log('controller for get favorites for a user triggered');
}

export const addFavorite = (user: string, countryToAdd: string) => {
  console.log('controller for addFavorite triggered');
}

export const deleteFavorite = (user: string, countryToRemove: string) => {
  console.log('controller for deleteFavorite triggered');
}

export const incrementClickData = (countryName: string) => {
  console.log('controller for incrementClickData triggered');
}