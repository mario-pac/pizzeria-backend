import AsyncStorage from "@react-native-async-storage/async-storage";
import { COMPANY_COLLECTION } from "storage/index";
import { CompanyDTO } from "./companyDTO";

export async function getCompany() {
    try {
        const storage = await AsyncStorage.getItem(`${COMPANY_COLLECTION}`)

        const company: CompanyDTO = storage ? JSON.parse(storage) : undefined;

        return company;
    } catch (err) {
        throw (err);
    }
}