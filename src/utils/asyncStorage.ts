import { AsyncStorage } from 'react-native';

export const authTokenName = 'authToken';
export const spotifyTokenName = 'spotifyToken';
// Note that AsyncStorage for mobile is, well.. async
// localStorage on web is not async

/**
 * Gets the site-stored authToken from AsyncStorage
 */
export async function getBearerToken() {
  try {
    return await AsyncStorage.getItem(authTokenName);
  } catch (e) {
    console.log('Error while getting bearer token: ', e);
  }
}

/**
 * Sets a returned token in AsyncStorage for attachment to later network requests
 * @param {*} token - A valid JWT authentication token
 */
export async function setBearerToken(token: string) {
  try {
    await AsyncStorage.setItem(authTokenName, token);
  } catch (e) {
    console.log('Error while setting bearer token: ', e);
  }
}

export async function getSpotifyToken() {
  try {
    return await AsyncStorage.getItem(spotifyTokenName);
  } catch (e) {
    console.log('Error while getting Spotify token: ', e);
  }
}

export async function setSpotifyToken(token: string) {
  try {
    await AsyncStorage.setItem(spotifyTokenName, token);
  } catch (e) {
    console.log('Error while setting Spotify token: ', e);
  }
}
