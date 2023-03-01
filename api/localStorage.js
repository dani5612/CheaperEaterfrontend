import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This function returns the value of the give key stored in the local storage of the device.
 * @param {string} keyInput is the key string through what a values has been referred in the local storage.
 * @returns the JSON of the value on the mention key in the parameter.
 */
const getLocalStorage = async (keyInput) => {
  return JSON.parse(await AsyncStorage.getItem(keyInput));
};

/**
 * This function sets the key-value pair to the local storage
 * @param {string} keyInput is the key to which you are assigning a value
 * @param {JSON} valueInput is the value user is setting to the given key
 */
const setLocalStorage = async (keyInput, valueInput) => {
  await AsyncStorage.setItem(keyInput, JSON.stringify(valueInput));
};

export { getLocalStorage, setLocalStorage };
