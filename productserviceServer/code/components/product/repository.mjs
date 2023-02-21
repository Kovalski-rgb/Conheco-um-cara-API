import { prisma } from "../../lib/database.mjs";

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