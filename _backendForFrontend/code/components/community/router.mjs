import { getMyCommunities, getMyPosts, getMyMessages } from "./service.mjs";

/**
 * @openapi
 * /communities/me:
 *   get:
 *     summary: "List all user communities"
 *
 *     tags:
 *       - "Community"
 *
 *     operationId: get_myCommunities
 *     x-eov-operation-handler: user/router
 *
 *     responses:
 *       '200':
 *         description: "Returns the communities list."
 *       '404':
 *         description: "Not found"
 */
export async function get_myCommunities(req, res, _) {
  const myCommunities = await getMyCommunities();
  return myCommunities ? res.json(myCommunities) : res.sendStatus(404);
}

/**
 * @openapi
 * /posts/me:
 *   get:
 *     summary: "List all user posts of all communities"
 *
 *     tags:
 *       - "Community"
 *
 *     operationId: get_myPosts
 *     x-eov-operation-handler: user/router
 *
 *     responses:
 *       '200':
 *         description: "Returns a list of posts."
 *       '404':
 *         description: "Not found"
 */
export async function get_myPosts(req, res, _) {
  const myPosts = await getMyPosts();
  return myPosts ? res.json(myPosts) : res.sendStatus(404);
}

/**
 * @openapi
 * /posts/me:
 *   get:
 *     summary: "List all user posts of all communities"
 *
 *     tags:
 *       - "Community"
 *
 *     operationId: get_myPosts
 *     x-eov-operation-handler: user/router
 *
 *     responses:
 *       '200':
 *         description: "Returns a list of posts."
 *       '404':
 *         description: "Not found"
 */
export async function get_myCommunityPosts(req, res, _) {
    const myPosts = await getMyPosts();
    return myPosts ? res.json(myPosts) : res.sendStatus(404);
  }

/**
 * @openapi
 * /messages/me:
 *   get:
 *     summary: "List all messages of all communities"
 *
 *     tags:
 *       - "Community"
 *
 *     operationId: get_myMessages
 *     x-eov-operation-handler: user/router
 *
 *     responses:
 *       '200':
 *         description: "Returns a list of messages."
 *       '404':
 *         description: "Not found"
 */
export async function get_myMessages(req, res, _) {
  const myMessages = await getMyMessages();
  return myMessages ? res.json(myMessages) : res.sendStatus(404);
}
