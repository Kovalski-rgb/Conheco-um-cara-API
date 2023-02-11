import axios from "axios"
import { createCommunity, enterCommunity, getAllUserIds, listEveryComunity, listEveryComunityFromUser, listEveryUserFromCommunity, removeUserFromCommunity } from "./service.mjs";

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
 
 *    responses:
 *      '200':
 *        description: "Created a new community"
 *      '401':
 *        description: "Users without authentication cannot create or join communities"
 *  
 *    security:
 *      - {}
 */
export async function listAllComunityUsers(req, res, _){
    const users = await listEveryUserFromCommunity(req.params.id); 
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
 * /community/leave:
 *  post:
 *    summary: "Request to leave a community"
 *    tags:
 *       - "Community"
 * 
 *    operationId: leaveCommunity
 *    x-eov-operation-handler: user/router
 * 
 *    requestBody:
 *      description: Login information
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/communityName'
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
    const success = await removeUserFromCommunity(req.user.id, req.body.name);
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
 *        description: "Created a new community"
 *      '403':
 *        description: "Some error ocurred during the community creating"
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
 *        description: "Created a new community"
 *      '401':
 *        description: "Users without authentication cannot create or join communities"
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
 *        description: "Created a new community"
 *      '401':
 *        description: "Users without authentication cannot create or join communities"
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
 * /test:
 *  get:
 *    summary: "test get request to another server"
 * 
 *    tags:
 *      - Testing
 *    
 *    operationId: testAxiosGet
 *    x-eov-operation-handler: user/router
 * 
 *    responses:
 *      '200':
 *        description: "New user registered successfully"
 *      '400':
 *        description: "Invalid data provided"
 *      '401':
 *        description: "Registration failed"
 * 
 *    security:
 *      - {}
 */
export async function testAxionGet(req, res, _) {
    const response = await axios.get(`http://localhost:3001/api/info`);
    console.log(response.data);
    return res.json(response.data);
}

/**
 * 
 * @openapi
 * /test:
 *  post:
 *    summary: test axios post request
 * 
 *    tags:
 *      - Testing
 * 
 *    operationId: testAxiosPost
 *    x-eov-operation-handler: user/router
 * 
 *    requestBody:
 *      description: Test res body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/testSchema"
 * 
 *    responses:
 *      '200':
 *        description: "New user registered successfully"
 *      '400':
 *        description: "Invalid data provided"
 *      '401':
 *        description: "Registration failed"
 * 
 *    security:
 *      - {}
 */
export async function testAxiosPost(req, res, _){
    console.log(req.body);
    if(req.body){
        return res.sendStatus(200);
    }
    return res.sendStatus(401);
}