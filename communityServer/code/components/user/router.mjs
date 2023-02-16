import { createCommunity, createNewCommunityPost, deleteTheCommunity, enterCommunity, getAllUserIds, listEveryComunity, listEveryComunityFromUser, listEveryUserFromCommunity, leaveFromCommunity } from "./service.mjs";

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
 * /community/users/{id}:
 *  get:
 *    summary: "List all users from specified community"
 *    
 *    tags:
 *       - "Users"
 * 
 *    parameters:
 *      - $ref: "#/components/parameters/Id"  
 * 
 *    operationId: listAllComunityUsers
 *    x-eov-operation-handler: user/router
 *
 *    responses:
 *      '200':
 *        description: "Listed all users from community successfully"
 *      '500':
 *        description: "Internal server error"
 *  
 *    security:
 *      - {}
 */
export async function listAllComunityUsers(req, res, _){
    const users = await listEveryUserFromCommunity(req.params.Id); 
    return res.json(users);
}

/**
 * @openapi
 * /community/create:
 *  post:
 *    summary: "Creates a new Community"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: createNewCommunity
 *    x-eov-operation-handler: user/router
 * 
 *    requestBody:
 *      description: Login information
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/community'
 *
 *    responses:
 *      '200':
 *        description: "Created a new community"
 *      '403':
 *        description: "Some error ocurred during the community creating"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function createNewCommunity(req, res, _) {
    const success = await createCommunity(req.user.id, req.body);
    return success ? res.sendStatus(200) : res.sendStatus(403);
}

/**
 * @openapi
 * /community/leave/{id}:
 *  post:
 *    summary: "Request to leave a community"
 *    tags:
 *       - "Community"
 * 
 *    operationId: leaveCommunity
 *    x-eov-operation-handler: user/router
 * 
 *    parameters:
 *       - $ref: "#/components/parameters/Id"
 *
 *    responses:
 *      '200':
 *        description: "Left the community"
 *      '403':
 *        description: "Not a moderator/not inside the commmunity"
 *      '404':
 *        description: "No community found available to leave"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function leaveCommunity(req, res, _) {
    const success = await leaveFromCommunity(req.user.id, req.params.id);
    console.log(success);
    return success ? res.sendStatus(200) : res.sendStatus(404);
}

/**
 * @openapi
 * /community/join:
 *  post:
 *    summary: "Request to enter a community"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: enterOnCommunity
 *    x-eov-operation-handler: user/router
 * 
 *    requestBody:
 *      description: Community information
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/communityParams'
 *
 *    responses:
 *      '200':
 *        description: "Succesfully joined a community"
 *      '403':
 *        description: "User has already joined this community"
 *      '404':
 *        description: "No communities match name/code combination"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function enterOnCommunity(req, res, _) {
    const success = await enterCommunity(req.user.id, req.body);
    return success ? res.sendStatus(200) : res.sendStatus(403);
}

/**
 * @openapi
 * /community/delete/{id}:
 *  delete:
 *    summary: "Request to delete a community"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: deleteCommunity
 *    x-eov-operation-handler: user/router
 * 
 *    parameters:
 *       - $ref: "#/components/parameters/Id"
 *
 *    responses:
 *      '200':
 *        description: "Deleted the community"
 *      '403':
 *        description: "User does not have moderator permission inside the community"
 *      '404':
 *        description: "Community not found"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function deleteCommunity(req, res, _) {
    const success = await deleteTheCommunity(req.user.id, req.params.id);
    return success ? res.sendStatus(200) : res.sendStatus(401);
}

/**
 * @openapi
 * /community/all:
 *  get:
 *    summary: "List all communities"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: listAllComunities
 *    x-eov-operation-handler: user/router
 *
 *    responses:
 *      '200':
 *        description: "Listed all communities successfully"
 *      '500':
 *        description: "Internal server error"
 * 
 *    security:
 *      - {}
 */
export async function listAllComunities(req, res, _){
    const communities = await listEveryComunity(); 
    return res.json(communities);
}

/**
 * @openapi
 * /community/me:
 *  get:
 *    summary: "List all communities that the logged user belongs"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: listAllUserComunities
 *    x-eov-operation-handler: user/router
 *
 *    responses:
 *      '200':
 *        description: "Listed all communities that user belongs successfully"
 *      '500':
 *        description: "Internal server error"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function listAllUserComunities(req, res, _){
    const communities = await listEveryComunityFromUser(req.user.id); 
    return res.json(communities);
}

/**
 * @openapi
 * /post/create:
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
    console.log(success);
    return success ? res.sendStatus(200) : res.sendStatus(403);
}
