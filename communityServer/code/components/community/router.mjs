import {
    createCommunity, deleteTheCommunity, enterCommunity,
    leaveFromCommunity, listEveryComunity, listEveryComunityFromUser,
    listEveryUserFromCommunity, toggleModeratorPermission, updateCommunityData
} from "./service.mjs";

/**
 * @openapi
 * /community:
 *  post:
 *    summary: "Creates a new Community"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: createNewCommunity
 *    x-eov-operation-handler: community/router
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
 * /community:
 *  put:
 *    summary: "Edits community information"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: updateCommunity
 *    x-eov-operation-handler: community/router
 * 
 *    requestBody:
 *      description: Login information
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/communityData'
 *
 *    responses:
 *      '200':
 *        description: "Updated the community"
 *      '403':
 *        description: "Some error ocurred during the operation"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function updateCommunity(req, res, _) {
    const success = await updateCommunityData(req.user.id, req.body);
    return success ? res.sendStatus(200) : res.sendStatus(403);
}



/**
 * @openapi
 * /community:
 *  get:
 *    summary: "List all communities"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: listAllComunities
 *    x-eov-operation-handler: community/router
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
export async function listAllComunities(req, res, _) {
    const communities = await listEveryComunity();
    return res.json(communities);
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
 *    x-eov-operation-handler: community/router
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
export async function listAllComunityUsers(req, res, _) {
    const users = await listEveryUserFromCommunity(req.params.id);
    return res.json(users);
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
 *    x-eov-operation-handler: community/router
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
 *    x-eov-operation-handler: community/router
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
 * /community/{id}:
 *  delete:
 *    summary: "Request to delete a community"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: deleteCommunity
 *    x-eov-operation-handler: community/router
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
 * /community/me:
 *  get:
 *    summary: "List all communities that the logged user belongs"
 *    
 *    tags:
 *       - "Community"
 * 
 *    operationId: listAllUserComunities
 *    x-eov-operation-handler: community/router
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
export async function listAllUserComunities(req, res, _) {
    const communities = await listEveryComunityFromUser(req.user.id);
    return res.json(communities);
}

/**
 * @openapi
 * /community/moderator:
 *  post:
 *    summary: "Toggle moderator privileges of one user"
 *    
 *    tags:
 *       - "Users"
 * 
 *    operationId: toggleModerator
 *    x-eov-operation-handler: community/router
 * 
 *    requestBody:
 *      description: IDs data to toggle mod permission
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/moderatorToggleTarget'
 *
 *    responses:
 *      '200':
 *        description: "Toggled moderator permission for target user"
 *      '401':
 *        description: "Current user does not have moderator permission"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function toggleModerator(req, res, _) {
    const success = await toggleModeratorPermission(req.user.id, req.body);
    return success ? res.sendStatus(200) : res.sendStatus(403);
}

