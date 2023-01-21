import { getUser, login } from "./service.mjs";

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: "Logs in the user"
 * 
 *     tags:
 *       - "auth"
 *     
 *     operationId: user_login
 *     x-eov-operation-handler: router
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
 * 
 * /users/{id}:
 *   get:
 *     summary: "Retrieves user information"
 * 
 *     tags:
 *       - "profile"
 * 
 *     parameters:
 *       - $ref: "#/components/parameters/Id"
 * 
 *     operationId: get_user
 *     x-eov-operation-handler: router
 * 
 *     responses:
 *       '200':
 *         description: "Returns the user"
 *       '404':
 *         description: "User not found"
 */
export async function get_user(req, res, _) {  
  const user = await getUser(parseInt(req.params.id));
  return user ? res.json(user) : res.sendStatus(404);  
}


/**
 * @openapi
 * /users/me:
 *   put:
 *     summary: "Updates user by id"
 * 
 *     tags:
 *       - "updateProfile"
 * 
 *     parameters:
 *       - $ref: "#/components/parameters/Id"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsernamePassword" 
 * 
 *     responses:
 *       200:
 *         decsription: The data was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateUser'
 *       500:
 *         description: Some errors happend.
 *
 */
 
export async function update_user(req, res, _) {  
  const user = await putUser(parseInt(req.params.id));
  return user ? res.json(user) : res.sendStatus(500);
}