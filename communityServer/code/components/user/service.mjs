import { forbidden, notFound, ServerError } from "../../lib/errors.mjs";
import { checkIsUserAlreadyRegisteredInsideCommunity, checkCommunityCode, getAllCommunities, getAllComunitiesFromUser, getAllIdsFromUsers, getAllUsersFromCommunity, registerCommunity, registerNewCommunityUser, registerNewModerator, registerUserId, deleteUserInsideCommunity, checkIfUserIsModerator, deleteCommunity, getCommunityByNameAndCode, createNewPost, getAllPostsFromCommunity, getPostFromCommunityById, deletePostFromCommunity, checkIfCommunityExists, updateCommunity, checkIfPostExists, getPostById, updatePost, getAllModeratorsFromCommunity, toggleModerator } from "./repository.mjs";

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
        const result = await deleteUserInsideCommunity(communityId, userId);
        const userList = await getAllUsersFromCommunity(communityId);
        if(userList[0].users.length === 0){
            await deleteCommunity(communityId);
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

export async function createNewCommunityPost(userId, { communityId, title, description, image, productsId, servicesId }) {
    ServerError.throwIf(!await checkIsUserAlreadyRegisteredInsideCommunity(communityId, userId), "Community not found!", notFound);
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

export async function deletePost(userId, {communityId, postId}) {
    ServerError.throwIf(!await checkIfCommunityExists(communityId), "Community not found!", notFound);
    const post = await getPostFromCommunityById(communityId, postId);
    ServerError.throwIf(!post, "No posts matching this id found inside this community", notFound);
    if(post.userId !== userId){
        ServerError.throwIfNot(await checkIfUserIsModerator(communityId, userId), "User does not have permission to delete this post", forbidden);
    }
    return await deletePostFromCommunity(postId);
}

export async function updateCommunityData(userId, communityData){
    ServerError.throwIf(!await checkIfCommunityExists(communityData.id), "Community not found!", notFound);
    ServerError.throwIf(!await checkIfUserIsModerator(communityData.id, userId), "User does not have moderator role inside community", forbidden);
    return await updateCommunity(communityData);
}

export async function updatePostData(userId, postData){
    ServerError.throwIf(!await checkIfCommunityExists(postData.communityId), "Community not found!", notFound);
    ServerError.throwIf(!await checkIfPostExists(postData.postId), "Post not found!", notFound);
    const post = await getPostById(postData.communityId, postData.postId);
    ServerError.throwIf(post.userId !== userId && !await checkIfUserIsModerator(postData.communityId, userId), "User does not have permission to update post", forbidden);
    return await updatePost(postData);
}

export async function toggleModeratorPermission(userId, {communityId, targetId}){
    ServerError.throwIf(!await checkIfCommunityExists(communityId), "Community not found!", notFound);
    ServerError.throwIf(!await checkIfUserIsModerator(communityId, userId), "User does not have moderator role inside community", forbidden);
    ServerError.throwIf(!await checkIsUserAlreadyRegisteredInsideCommunity(communityId, targetId), "Target user not found!", notFound);
    const moderatorList = await getAllModeratorsFromCommunity(communityId);
    ServerError.throwIf((userId === targetId && moderatorList.length===1),"A community cannot have no moderators", forbidden); 
    console.log("YESYESYES");
    return await toggleModerator(communityId, targetId);
}