import getGlobalAnalyticData from "../models/getGlobalAnalyticData";
import checkUser from "../models/checkUser";
import createUserEntry from "../models/createUserEntry";
import getUserProfile from "../models/getUserProfile";
import getFavorites from "../models/getFavorites";
import logFavorite from "../models/logFavorite";
import removeFavorite from "../models/removeFavorite";
import trackClick from "../models/trackClick";

export const fetchGlobalAnalyticData = () => {
  console.log('controller for fetchGlobalAnalyticData triggered');
}
export const checkForUser = (username: string) => {
  return checkUser(username);
}
export const createUser = (username: string, session_id: string) => {
  // create a user with given username mixed with session data
  return createUserEntry(username, session_id);
}
export const fetchUserData = (session: any) => {
  // get data for a user based on their session id
  return getUserProfile(session);
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
