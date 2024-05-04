import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_COLLECTION } from 'storage/index';
import { UserDTO } from './userDTO';

export async function addUser(newUser: UserDTO) {
    try {

        const storage = JSON.stringify(newUser);

        await AsyncStorage.setItem(USER_COLLECTION, storage);
    } catch (err) {
        throw err;
    }
}