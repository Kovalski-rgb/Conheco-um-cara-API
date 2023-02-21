import { registerUserId, registerProduct } from "./repository.mjs";


export async function createProduct(userId, { name, description, price, productTypeId }) {
    await registerUserId(userId);
    const product = await registerProduct({ name, description, userId, price, productTypeId });
    if (product) return true;
    return false;
}