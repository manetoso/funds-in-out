import AsyncStorage from "@react-native-async-storage/async-storage";

import { log } from "../utils/logger";

export const useAsyncStorage = () => {
  const setItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      log.error(`Error saving item ${key} in storage.`, error);
    }
  };

  const getItem = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      log.error(`Error getting item ${key}`, e);
    }
  };

  return { setItem, getItem };
};
