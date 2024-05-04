import AsyncStorage from '@react-native-async-storage/async-storage';
import { COMPANY_COLLECTION } from 'storage/index';
import { CompanyDTO } from './companyDTO';

export async function addCompany(newCompany: CompanyDTO) {
    try {

        const storage = JSON.stringify(newCompany);

        await AsyncStorage.setItem(COMPANY_COLLECTION, storage);
    } catch (err) {
        throw err;
    }
}