import AsyncStorage from "@react-native-async-storage/async-storage";
import { SETTING_COLLECTION } from "storage/index";
import { SettingDTO } from "./settingDTO";

export async function getSetting() {
    try {
        const storage = await AsyncStorage.getItem(`${SETTING_COLLECTION}`)

        const setting: SettingDTO = storage ? JSON.parse(storage) : undefined;

        return setting;
    } catch (err) {
        throw (err);
    }
}