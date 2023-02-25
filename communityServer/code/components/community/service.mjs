import { forbidden, notFound, ServerError } from "../../lib/errors.mjs";
import {
    checkIsUserAlreadyRegisteredInsideCommunity, checkCommunityCode, getAllCommunities,
    getAllComunitiesFromUser, getAllUsersFromCommunity, registerCommunity,
    registerNewCommunityUser, registerNewModerator, registerUserId, deleteUserInsideCommunity,
    checkIfUserIsModerator, deleteCommunity, getCommunityByNameAndCode, checkIfCommunityExists,
    updateCommunity, getAllModeratorsFromCommunity, toggleModerator, getAllIdsFromUsers
} from "./repository.mjs";

export async function getAllUserIds() {
    return await getAllIdsFromUsers();
}

export async function createCommunity(userId, { name, description }) {
    await registerUserId(userId)
    const community = await registerCommunity({ name, description });

    if (await registerNewModerator(community.id, userId)) {
        await registerNewCommunityUser(community.id, userId);
        return true
    }
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
    const community = await getCommunityByNameAndCode(name, code);
    const exist = await checkCommunityCode(community.id, code);
    if (exist) {
        if (!await checkIsUserAlreadyRegisteredInsideCommunity(community.id, userId)) {
            await registerNewCommunityUser(community.id, userId);
            return true;
        }
        ServerError.throwIf(true, "User has already joined this community!", forbidden);
    }
    ServerError.throwIf(true, "No communities match name/code combination!", notFound);
}

export async function leaveFromCommunity(userId, communityId) {
    communityId = parseInt(communityId);
    if (await checkIsUserAlreadyRegisteredInsideCommunity(communityId, userId)) {
        const result = await deleteUserInsideCommunity(communityId, userId);
        const userList = await getAllUsersFromCommunity(communityId);
        if (userList[0].users.length === 0) {
            await deleteCommunity(communityId);
        } else {
            const modList = await getAllModeratorsFromCommunity(communityId);
            console.log(modList);
            if (modList.length === 0) {
                toggleModerator(communityId, parseInt(userList[0].users[0].id));
            }
        }
        return result;
    }
    ServerError.throwIf(true, 'No communities found for that user', notFound);
}

export async function deleteTheCommunity(userId, communityId) {
    if (!await checkIsUserAlreadyRegisteredInsideCommunity(communityId, userId))
        ServerError.throwIf(true, "Community not found!", notFound);
    if (await checkIfUserIsModerator(communityId, userId)) {
        return await deleteCommunity(communityId);
    }
    ServerError.throwIf(true, "User does not have moderator permissions!", forbidden);
}

export async function updateCommunityData(userId, communityData) {
    ServerError.throwIf(!await checkIfCommunityExists(communityData.id), "Community not found!", notFound);
    ServerError.throwIf(!await checkIfUserIsModerator(communityData.id, userId), "User does not have moderator role inside community", forbidden);
    return await updateCommunity(communityData);
}

export async function toggleModeratorPermission(userId, { communityId, targetId }) {
    ServerError.throwIf(!await checkIfCommunityExists(communityId), "Community not found!", notFound);
    ServerError.throwIf(!await checkIfUserIsModerator(communityId, userId), "User does not have moderator role inside community", forbidden);
    ServerError.throwIf(!await checkIsUserAlreadyRegisteredInsideCommunity(communityId, targetId), "Target user not found!", notFound);
    const moderatorList = await getAllModeratorsFromCommunity(communityId);
    ServerError.throwIf((userId === targetId && moderatorList.length === 1), "A community cannot have no moderators", forbidden);
    return await toggleModerator(communityId, targetId);
}