import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_COLLECTION } from "storage/index";

export async function removeUser() {
    try {
        await AsyncStorage.removeItem(`${USER_COLLECTION}`);
    } catch (err) {
        throw (err);
    }
}