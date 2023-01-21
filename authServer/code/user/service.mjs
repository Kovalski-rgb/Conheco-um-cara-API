import { createToken } from "../jwt.mjs";
import { loadByCredentials, loadById, } from "./repository.mjs";

export async function login({username, password}) {
    const user = await loadByCredentials(username, password);
    if (user) return {
        token: createToken(user),
        ...user
    };
    return null;
}

export async function getUser(id) {
    return loadById(id);
}

export async function updateUserData({username, password}) {

    return null;
}