import { createNewCommunityPost,getAllUserIds, 
    getAllPostsFromAllUserCommunities, deletePost, 
     updatePostData,  } from "./service.mjs";

/**
 * @openapi
 * /user/list:
 *  get:
 *    summary: "List all user IDs that are inside of at least one community"
 *    
 *    tags:
 *       - "Users"
 * 
 *    operationId: listAllCommunityUsers
 *    x-eov-operation-handler: user/router
 * 
 *    responses:
 *      '200':
 *        description: "Got all users that are inside communities"
 *      '500':
 *        description: "Internal server error"
 * 
 *    security:
 *      - {}
 */
export async function listAllCommunityUsers(req, res, _) {
    const users = await getAllUserIds();
    return res.json(users);
}

/**
 * @openapi
 * /post:
 *  post:
 *    summary: "Create a new post inside community"
 *    
 *    tags:
 *       - "Posts"
 * 
 *    operationId: createNewPost
 *    x-eov-operation-handler: user/router
 * 
 *    requestBody:
 *      description: Post data
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/postData'
 *
 *    responses:
 *      '200':
 *        description: "Created a new post"
 *      '404':
 *        description: "Unknown community"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function createNewPost(req, res, _) {
    const success = await createNewCommunityPost(req.user.id, req.body);
    return success ? res.sendStatus(200) : res.sendStatus(403);
}

/**
 * @openapi
 * /post:
 *  get:
 *    summary: "Get all posts from all communities that user is in"
 *    
 *    tags:
 *       - "Posts"
 * 
 *    operationId: getAllPosts
 *    x-eov-operation-handler: user/router
 *
 *    responses:
 *      '200':
 *        description: "Gets all posts from communities"
 *      '404':
 *        description: "Unknown community"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function getAllPosts(req, res, _) {
    const success = await getAllPostsFromAllUserCommunities(req.user.id);
    return success ? res.json(success) : res.sendStatus(403);
}

/**
 * @openapi
 * /post:
 *  delete:
 *    summary: "Deletes a specified post from a specified community"
 *    
 *    tags:
 *       - "Posts"
 * 
 *    operationId: deletePostFromCommunity
 *    x-eov-operation-handler: user/router
 * 
 *    requestBody:
 *      description: Post and community Id
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/postIdData'
 *
 *    responses:
 *      '200':
 *        description: "Deleted post succesfully"
 *      '403':
 *        description: "Refused if user does not have proper permission (is not creator, or not a community moderator)"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function deletePostFromCommunity(req, res, _) {
    const success = await deletePost(req.user.id, req.body);
    return success ? res.json(success) : res.sendStatus(403);
}

/**
 * @openapi
 * /post:
 *  put:
 *    summary: "Edits post information"
 *    
 *    tags:
 *       - "Posts"
 * 
 *    operationId: updatePost
 *    x-eov-operation-handler: user/router
 * 
 *    requestBody:
 *      description: Login information
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/updatePostData'
 *
 *    responses:
 *      '200':
 *        description: "Updated the post"
 *      '403':
 *        description: "Some error ocurred during the operation"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function updatePost(req, res, _) {
    const success = await updatePostData(req.user.id, req.body);
    return success ? res.sendStatus(200) : res.sendStatus(403);
}