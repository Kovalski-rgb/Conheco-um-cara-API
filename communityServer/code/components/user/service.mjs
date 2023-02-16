import { forbidden, notFound, ServerError } from "../../lib/errors.mjs";
import { checkIsUserAlreadyRegisteredInsideCommunity, checkCommunityCode, getAllCommunities, getAllComunitiesFromUser, getAllIdsFromUsers, getAllUsersFromCommunity, registerCommunity, registerNewCommunityUser, registerNewModerator, registerUserId, deleteUserInsideCommunity, checkIfUserIsModerator, deleteCommunity } from "./repository.mjs";

export async function getAllUserIds() {
    return await getAllIdsFromUsers();
}

export async function createCommunity(userId, { name, description }) {
    await registerUserId(userId)
    if (await registerCommunity({ name, description }))
        if (await registerNewModerator(name, userId))
            if (await registerNewCommunityUser(name, userId))
                return true
    return false;
}

export async function listEveryUserFromCommunity(communityId) {
    return await getAllUsersFromCommunity(communityId);
}

export async function listEveryComunity() {
    return await getAllCommunities();
}

export async function listEveryComunityFromUser(id) {
    return await getAllComunitiesFromUser(id);
}

export async function enterCommunity(userId, { name, code }) {
    const exist = await checkCommunityCode(name, code);
    if (exist) {
        if (!await checkIsUserAlreadyRegisteredInsideCommunity(name, userId)) {
            await registerNewCommunityUser(name, userId);
            return true;
        }
        ServerError.throwIf(true, "User has already joined this community!", forbidden);
    }
    ServerError.throwIf(true, "No communities match name/code combination!", notFound);
}

export async function removeUserFromCommunity(userId, communityName) {
    if (await checkIsUserAlreadyRegisteredInsideCommunity(communityName, userId)) {
        return await deleteUserInsideCommunity(communityName, userId);
    }
    if (await checkIfUserIsModerator(communityName, userId)) {
        return await deleteUserInsideCommunity(communityName, userId);
    }
    return false;
}

export async function deleteTheCommunity(userId, communityName){
    if (!await checkIsUserAlreadyRegisteredInsideCommunity(communityName, userId))
        ServerError.throwIf(true, "Community not found!", notFound);
    if (await checkIfUserIsModerator(communityName, userId)) {
        return await deleteCommunity(communityName);
    }
    ServerError.throwIf(true, "User does not have moderator permissions!", forbidden);
}

export async function createNewCommunityPost(userId, {communityId, title, description, image, productsId, servicesId}){
    ServerError.throwIf(true, `to be implemented`, notFound);
}
