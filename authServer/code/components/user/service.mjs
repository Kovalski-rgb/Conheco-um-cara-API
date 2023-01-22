import { createToken } from "../../jwt.mjs";
import { loadByCredentials, loadById, registerNewUser, updateUserData, removeOwnUser, removeUserById} from "./repository.mjs";

export async function login({email, password}) {
    const user = await loadByCredentials(email, password);
    if (user) return {
        token: createToken(user),
        ...user
    };
    return null;
}

export async function getUser(id) {
    return loadById(id);
}

export async function registerUser({name, email, password}){
    return await registerNewUser({name, email, password});
}

export async function updateUser({id, name, email, password, telephone}){
    return await updateUserData({id, name, email, password, telephone});
}

export async function deleteOwnUser(id){
    return await removeOwnUser(id);
}


export async function deleteUser(id){
    return await removeUserById(id);
}