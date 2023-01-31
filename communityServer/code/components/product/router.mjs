import axios from "axios"

/**
 * @openapi
 * /test:
 *  get:
 *    summary: "test"
 *    
 *    operationId: testAxiosGet
 *    x-eov-operation-handler: product/router
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
 *    operationId: testAxiosPost
 *    x-eov-operation-handler: product/router
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