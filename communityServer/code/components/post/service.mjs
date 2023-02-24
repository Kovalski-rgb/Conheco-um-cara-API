import { forbidden, notFound, ServerError } from "../../lib/errors.mjs";
import {
    checkIsUserAlreadyRegisteredInsideCommunity, getAllComunitiesFromUser,
    checkIfUserIsModerator, createNewPost, getAllPostsFromCommunity,
    getPostFromCommunityById, deletePostFromCommunity, checkIfCommunityExists,
    checkIfPostExists, getPostById, updatePost
} from "./repository.mjs";

export async function createNewCommunityPost(userId, { communityId, title, description, image, productsId, servicesId }) {
    ServerError.throwIf(!await checkIsUserAlreadyRegisteredInsideCommunity(communityId, userId), "Community not found!", notFound);
    return await createNewPost(userId, { communityId, title, description, image, productsId, servicesId });
}

export async function getAllPostsFromAllUserCommunities(userId) {
    let posts = [];
    const communities = await getAllComunitiesFromUser(userId);
    for (let i = 0; i < communities.length; i++) {
        posts.push(await getAllPostsFromCommunity(communities[i].id));
    }
    return posts;
}

export async function deletePost(userId, { communityId, postId }) {
    ServerError.throwIf(!await checkIfCommunityExists(communityId), "Community not found!", notFound);
    const post = await getPostFromCommunityById(communityId, postId);
    ServerError.throwIf(!post, "No posts matching this id found inside this community", notFound);
    if (post.userId !== userId) {
        ServerError.throwIfNot(await checkIfUserIsModerator(communityId, userId), "User does not have permission to delete this post", forbidden);
    }
    return await deletePostFromCommunity(postId);
}

export async function updatePostData(userId, postData) {
    ServerError.throwIf(!await checkIfCommunityExists(postData.communityId), "Community not found!", notFound);
    ServerError.throwIf(!await checkIfPostExists(postData.postId), "Post not found!", notFound);
    const post = await getPostById(postData.communityId, postData.postId);
    ServerError.throwIf(post.userId !== userId && !await checkIfUserIsModerator(postData.communityId, userId), "User does not have permission to update post", forbidden);
    return await updatePost(postData);
}
