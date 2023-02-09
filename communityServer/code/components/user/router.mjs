import axios from "axios"
import { getAllUserIds, createCommunity, listEveryComunities, listEveryComunityUser } from "./service.mjs";

/**
 * @openapi
 * /user/list:
 *  get:
 *    summary: "List all user IDs that are in a community"
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
    const communities = await listEveryComunities(); 
    return res.json(communities);
}

/**
 * @openapi
 * /community/users/{id}:
 *  get:
 *    summary: "List all users from specified community"
 *    
 *    tags:
 *       - "Community"
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
    const users = await listEveryComunityUser(req.params.id); 
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