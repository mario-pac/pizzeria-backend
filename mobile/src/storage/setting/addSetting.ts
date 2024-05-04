import AsyncStorage from '@react-native-async-storage/async-storage';
import { SETTING_COLLECTION } from 'storage/index';
import { SettingDTO } from './settingDTO';

export async function addSetting(newSetting: SettingDTO) {
    try {

        const storage = JSON.stringify(newSetting);

        await AsyncStorage.setItem(SETTING_COLLECTION, storage);
    } catch (err) {
        throw err;
    }
}