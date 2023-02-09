import axios from "axios"
import { getAllUserIds, createCommunity } from "./service.mjs";

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
    console.log(users);
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
 *      '401':
 *        description: "Users without authentication cannot create or join communities"
 * 
 *    security:
 *      - JWT: ['USER']
 */
export async function createNewCommunity(req, res, _) {
    await createCommunity(req.user.id, req.body);
    return res.sendStatus(200);
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