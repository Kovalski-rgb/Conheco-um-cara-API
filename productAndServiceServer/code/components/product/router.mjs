import axios from "axios"
/**
 * @openapi
 * /test:
 *  get:
 *    summary: "test"
 *    
 *    operationId: testAxionGet
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
    

}