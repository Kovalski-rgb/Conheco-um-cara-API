import { getUser, login, registerUser, updateUser } from "./service.mjs";

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: "Logs in the user"
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
 * /users/{id}:
 *   get:
 *     summary: "Retrieves user information"
 * 
 *     tags:
 *       - "Profile"
 * 
 *     parameters:
 *       - $ref: "#/components/parameters/Id"
 * 
 *     operationId: get_user
 *     x-eov-operation-handler: user/router
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
 *  get:
 *    summary: "Gets currently logged user"
 *  
 *    tags:
 *      - "Profile"
 *  
 *    operationId: get_current_user
 *    x-eov-operation-handler: user/router
 *  
 *    responses:
 *      '200':
 *        description: "New user registered sucesfully"
 *      '400':
 *        description: "Invalid data provided"
 *      '401':
 *        description: "Registration failed"
 * 
 *    security:
 *      - {}
 *      - JWT: ['USER']
 */
export async function get_current_user(req, res, _){
  if(!req.user){
    return res.send("Guest user");
  }
  const user = await getUser(parseInt(req.user.id));
  return user ? res.json(user) : res.sendStatus(404); 
}

/**
 * @openapi
 * /users:
 *   post:
 *     summary: "Creates a new user"
 * 
 *     tags:
 *       - "Profile"
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
 *         description: "New user registered sucesfully"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Registration failed"
 */
export async function user_register(req, res, _) {
  const user = await registerUser(req.body);
  return user ? res.sendStatus(200) : res.sendStatus(401);
}

/**
 * @openapi
 * /info:
 * 
 *  get:
 *    summary: Retrieves Developer Information
 * 
 *    tags:
 *      - "Misc"
 * 
 *    operationId: dev_info
 *    x-eov-operation-handler: user/router
 * 
 *    responses:
 *      '200':
 *        description: "Developer info retrieved sucesfully"
 */
export async function dev_info(req, res, _){
  return res.json([
    {
      "name": "André Luiz Kovalski",
      "github": "https://github.com/Kovalski-rgb"
    },
    {
      "name": "Carlos Mareo Suzuki",
      "github": "https://github.com/carlosuzuki"
    },
    {
      "name": "Fernando Andrey Borman",
      "github": "https://github.com/fborman"
    }
  ]);
}

/**
 * @openapi
 * /users/me:
 *  put:
 *    summary: "Updates user data"
 *
 *    tags:
 *      - "Profile"
 *
 *    operationId: user_update
 *    x-eov-operation-handler: user/router
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UserInfo" 
 *
 *    responses:
 *      200:
 *        description: Update sucesfully
 *      401:
 *        description: Unauthorized put request
 *      500:
 *        description: Some errors happend.
 *
 *    security:
 *      - JWT: ['USER']
 */

export async function user_update(req, res, _) {
  if(!req.user){ res.sendStatus(401); }
  req.body.id = req.user.id;
  const userData = await updateUser(req.body);
  return userData ? res.sendStatus(200) : res.sendStatus(500);
}