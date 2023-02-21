import {
    createProduct
  } from "./service.mjs";

/**
 * @openapi
 * /product:
 *  post:
 *    summary: "Creates a new Product"
 *    
 *    tags:
 *       - "Product"
 * 
 *    operationId: createNewProduct
 *    x-eov-operation-handler: product/router
 * 
 *    requestBody:
 *      description: Login information
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/product'
 *
 *    responses:
 *      '200':
 *        description: "Created a new product"
 *      '403':
 *        description: "Some error ocurred during the product creating"
 * 
 *    security:
 *      - JWT: ['USER'] 
 */
export async function createNewProduct(req, res, _) {
  const success = await createProduct(req.user.id, req.body);
  return success ? res.sendStatus(200) : res.sendStatus(403);
}

