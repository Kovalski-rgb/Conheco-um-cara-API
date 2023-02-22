import { prisma } from "../../lib/database.mjs";
import bcrypt from "bcrypt";
import { badRequest, notFound, ServerError, unauthorized } from '../../lib/errors.mjs';

const PRODUCT_FIELDS = {
    id: true,
    name: true,
    description: true,
    userId: true,
    price: true,
	active: true,
	productTypeId: true,
	createdAt: true
}

const SERVICE_FIELDS = {
    id: true,
    name: true,
    description: true,
    userId: true,
    price: true,
	active: true,
	serviceTypeId: true,
	createdAt: true
}


export async function registerUserId(id) {
	const exists = await prisma.users.findFirst({
		where: {
			id
		}
	});
	if (exists) return false;

	const success = await prisma.users.create({
		data: {
			id
		}
	});
	return true;
}

export async function registerProduct({ name, description, userId, price, productTypeId }) {
	return await prisma.Products.create({
		data: {
			...{ name, description, userId, price, productTypeId }
		}
	});
}

export async function registerService({ name, description, userId, price, serviceTypeId }) {
	return await prisma.Services.create({
		data: {
			...{ name, description, userId, price, serviceTypeId }
		}
	});
}

export async function deleteProduct(productId) {
	const succeded = await prisma.Products.delete({
		where: { id: parseInt(productId) }
	});
	return succeded;
}

export async function checkIfUserIsProductOwner(productId, userId) {
	const po = await prisma.Products.findFirst({
		where: {
			id: parseInt(productId),
			userId: parseInt(userId)
		}
	});
	if (po) return true;
	return false;
}

export async function deleteService(serviceId) {
	const succeded = await prisma.Services.delete({
		where: { id: parseInt(serviceId) }
	});
	return succeded;
}

export async function checkIfUserIsServiceOwner(serviceId, userId) {
	const exists = await prisma.Services.findFirst({
		where: {
			id: parseInt(serviceId),
			userId: parseInt(userId)
		}
	});
	if (exists) return true;
	return false;
}

export async function getAllProducts() {
	const products = await prisma.products.findMany();
	products.map(c => delete c.code);
	return products;
}

export async function getAllServices() {
	const services = await prisma.services.findMany();
	services.map(c => delete c.code);
	return services;
}

export async function loadProductById(id) {
    const product = await prisma.products.findUnique({
        where: { id },
        select: PRODUCT_FIELDS
    });
    if (!product) return null;
    return product;
}

export async function loadServiceById(id) {
    const service = await prisma.services.findUnique({
        where: { id },
        select: SERVICE_FIELDS
    });
    if (!service) return null;
    return service;
}

export async function updateProduct(productData) {
	const id = productData.id;
	delete productData.id;
	return await prisma.products.update({
		where: { id: id },
		data: {
			...productData
		}
	});
}

export async function updateService(serviceData) {
	const id = serviceData.id;
	delete serviceData.id;
	return await prisma.services.update({
		where: { id: id },
		data: {
			...serviceData
		}
	});
}

