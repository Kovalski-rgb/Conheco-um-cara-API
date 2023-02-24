import {
  registerUserId,
  registerProduct,
  registerService,
  deleteProduct,
  checkIfUserIsProductOwner,
  deleteService,
  checkIfUserIsServiceOwner,
  getAllProducts,
  getAllServices,
  loadProductById,
  loadServiceById,
  //checkIfProductExists,
  updateProduct,
  updateService
} from "./repository.mjs";

export async function createProduct(
  userId,
  { name, description, price, productTypeId }
) {
  await registerUserId(userId);
  const product = await registerProduct({
    name,
    description,
    userId,
    price,
    productTypeId,
  });
  if (product) return true;
  return false;
}

export async function createService(
  userId,
  { name, description, price, serviceTypeId }
) {
  await registerUserId(userId);
  const service = await registerService({
    name,
    description,
    userId,
    price,
    serviceTypeId,
  });
  if (service) return true;
  return false;
}

export async function deleteTheProduct(userId, productId) {
  if (await checkIfUserIsProductOwner(productId, userId)) {
    return await deleteProduct(productId);
  }
  ServerError.throwIf(true, "User does not have permissions!", forbidden);
}

export async function deleteTheService(userId, serviceId) {
  if (await checkIfUserIsServiceOwner(serviceId, userId)) {
    return await deleteService(serviceId);
  }
  ServerError.throwIf(true, "User does not have permissions!", forbidden);
}

export async function listEveryProduct() {
  return await getAllProducts();
}

export async function listEveryService() {
  return await getAllServices();
}

export async function getProduct(id) {
  return await loadProductById(id);
}

export async function getService(id) {
  return await loadServiceById(id);
}

export async function updateProductData(userId, productData) {
  //todo: checkIfProductExists
  if (await checkIfUserIsProductOwner(productData.id, userId)) {
    return await updateProduct(productData);
  } 
}

export async function updateServiceData(userId, serviceData) {
  //todo: checkIfServiceExists
  if (await checkIfUserIsServiceOwner(serviceData.id, userId)) {
    return await updateService(serviceData);
  } 
}

