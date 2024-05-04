import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_COLLECTION } from "storage/index";
import { UserDTO } from "./userDTO";

export async function getUser() {
    try {
        const storage = await AsyncStorage.getItem(`${USER_COLLECTION}`)

        const user: UserDTO = storage ? JSON.parse(storage) : undefined;

        return user;
    } catch (err) {
        throw (err);
    }
}