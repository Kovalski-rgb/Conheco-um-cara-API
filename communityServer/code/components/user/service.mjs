import { getAllIds, registerCommunity, registerNewModerator, registerUserId } from "./repository.mjs";

export async function getAllUserIds() {
    return await getAllIds();
}

export async function createCommunity(userId, {name, description}){
    await registerUserId(userId);
    await registerCommunity({name, description});
    await registerNewModerator(name, userId);
}