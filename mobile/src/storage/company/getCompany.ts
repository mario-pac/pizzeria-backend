import AsyncStorage from "@react-native-async-storage/async-storage";
import { Models } from "api/index";
import { COMPANY_COLLECTION } from "storage/index";


export async function getCompany() {
    try {
        const storage = await AsyncStorage.getItem(`${COMPANY_COLLECTION}`)

        const company: Models.Company = storage ? JSON.parse(storage) : undefined;

        return company;
    } catch (err) {
        throw (err);
    }
}