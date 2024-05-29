import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'api/index';
import { COMPANY_COLLECTION } from 'storage/index';

export async function addCompany(newCompany: Models.Company) {
    try {

        const storage = JSON.stringify(newCompany);

        await AsyncStorage.setItem(COMPANY_COLLECTION, storage);
    } catch (err) {
        throw err;
    }
}