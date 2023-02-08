import { registerUser, login } from "./service.mjs";

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: "Logs in the user. If the log in was successfull return a token."
 * 
 *     tags:
 *       - "Authentication"
 *     
 *     operationId: user_login
 *     x-eov-operation-handler: user/router
 * 
 *     requestBody:
 *       description: Login information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsernamePassword" 
 * 
 *     responses:
 *       '200':
 *         description: "User logged in"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Login failed"
 */
export async function user_login(req, res, _) {
    const user = await login(req.body);
    return user ? res.json(user) : res.sendStatus(401);
  }

  
/**
 * @openapi
 * /users:
 *   post:
 *     summary: "Creates a new user."
 * 
 *     tags:
 *       - "New User"
 *     
 *     operationId: user_register
 *     x-eov-operation-handler: user/router
 * 
 *     requestBody:
 *       description: New user information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/NewUserInfo" 
 * 
 *     responses:
 *       '200':
 *         description: "New user registered successfully"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Registration failed"
 */
export async function user_register(req, res, _) {
  const user = await registerUser(req.body);
  return user ? res.sendStatus(200) : res.sendStatus(401);
}








