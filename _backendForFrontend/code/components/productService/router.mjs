import { getMyProducts, getMyServices } from "./service.mjs";

/**
 * @openapi
 * /products/me:
 *   get:
 *     summary: "List all user products"
 *
 *     tags:
 *       - "Products and Services"
 *
 *     operationId: get_myProducts
 *     x-eov-operation-handler: user/router
 *
 *     responses:
 *       '200':
 *         description: "Returns the products list."
 *       '404':
 *         description: "Not found"
 */
export async function get_myProducts(req, res, _) {
  const myProducts = await getMyProducts();
  return myProducts ? res.json(myProducts) : res.sendStatus(404);
}

/**
 * @openapi
 * /services/me:
 *   get:
 *     summary: "List all user services"
 *
 *     tags:
 *       - "Products and Services"
 *
 *     operationId: get_myServices
 *     x-eov-operation-handler: user/router
 *
 *     responses:
 *       '200':
 *         description: "Returns the products list."
 *       '404':
 *         description: "Not found"
 */
export async function get_myServices(req, res, _) {
    const myServices = await getMyServices();
    return myServices ? res.json(myServices) : res.sendStatus(404);
  }