import { createToken } from "../jwt.mjs";
import { loadByCredentials, loadById, } from "./repository.mjs";

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