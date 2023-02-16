import { forbidden, notFound, ServerError } from "../../lib/errors.mjs";
import { checkIsUserAlreadyRegisteredInsideCommunity, checkCommunityCode, getAllCommunities, getAllComunitiesFromUser, getAllIdsFromUsers, getAllUsersFromCommunity, registerCommunity, registerNewCommunityUser, registerNewModerator, registerUserId, deleteUserInsideCommunity, checkIfUserIsModerator, deleteCommunity, getCommunityByNameAndCode, createNewPost, getAllPostsFromCommunity } from "./repository.mjs";

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
    if (await checkIsUserAlreadyRegisteredInsideCommunity(communityId, userId)) {
        return await deleteUserInsideCommunity(communityId, userId);
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

export async function createNewCommunityPost(userId, { communityId, title, description, image, productsId, servicesId }) {
    if (!await checkIsUserAlreadyRegisteredInsideCommunity(communityId, userId))
        ServerError.throwIf(true, "Community not found!", notFound);
    return await createNewPost(userId, { communityId, title, description, image, productsId, servicesId });
}

export async function getAllPostsFromAllUserCommunities(userId) {
    let posts = [];
    const communities = await getAllComunitiesFromUser(userId);
    for(let i = 0; i < communities.length; i++){
        posts.push(await getAllPostsFromCommunity(communities[i].id));
    }
    return posts;
}