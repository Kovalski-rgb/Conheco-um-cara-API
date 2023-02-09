import { getAllIds, registerCommunity, registerNewModerator, registerUserId, getAllCommunities, getAllCommunityUsers, registerNewCommunityUser } from "./repository.mjs";

export async function getAllUserIds() {
    return await getAllIds();
}

export async function createCommunity(userId, { name, description }) {
    if (await registerUserId(userId))
        if (await registerCommunity({ name, description }))
            if (await registerNewModerator(name, userId))
                if (await registerNewCommunityUser(name, userId))
                    return true
    return false
}

export async function listEveryComunityUser(communityId) {
    return await getAllCommunityUsers(communityId);
}

export async function listEveryComunities() {
    return await getAllCommunities();
}