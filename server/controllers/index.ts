import getGlobalAnalyticData from "../models/getGlobalAnalyticData";
import checkUser from "../models/checkUser";
import createUserEntry from "../models/createUserEntry";
import getUserProfile from "../models/getUserProfile";
import getFavorites from "../models/getFavorites";
import logFavorite from "../models/logFavorite";
import removeFavorite from "../models/removeFavorite";
import trackClick from "../models/trackClick";

export const fetchGlobalAnalyticData = () => {
  return getGlobalAnalyticData();
}
export const checkForUser = (username: string, pin: number, session_id?: string) => {
  return checkUser(username, pin, session_id);
}
export const createUser = (username: string, pin: number, session_id: string) => {
  return createUserEntry(username, pin, session_id);
}
export const fetchUserData = (session: any) => {
  return getUserProfile(session);
}

export const getAllFavorites = (user: string) => {
  return getFavorites(user);
}

export const addFavorite = (user: string, artist: string, countryToAdd: string) => {
  return logFavorite(user, artist, countryToAdd)
}

export const deleteFavorite = (user: string, countryToRemove: string) => {
  console.log('controller for deleteFavorite triggered');
}

export const incrementClickData = (countryName: string, iso: string) => {
  return trackClick(countryName, iso);
}
