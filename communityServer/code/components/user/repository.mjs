import { prisma } from "../../lib/database.mjs";


// ------------------------- get functions
export async function getAllCommunities() {
	const communities = await prisma.communities.findMany();
	communities.map(c => delete c.code);
	return communities;
}

export async function getAllIdsFromUsers() {
	return await prisma.users.findMany({
		select: {
			id: true,
		},
	});
}

export async function getAllUsersFromCommunity(communityId) {
	const users = await prisma.communities.findMany({
		where: { id: parseInt(communityId) },
		select: { users: true }
	});
	return users;
}

export async function getAllComunitiesFromUser(id) {
	const userCommunities = await prisma.users.findMany({
		where: { id },
		select: { communities: true }
	});
	if (userCommunities.length === 0) return [];
	let communities = userCommunities[0].communities;
	return communities;
}

export async function getAllModeratorsFromCommunity(communityId) {
	const moderatorObject = await prisma.communities.findFirst({
		where: { id: parseInt(communityId) },
		select: {
			moderators: true
		}
	});
	moderatorObject.moderators.map(mods => {
		delete mods.id;
		delete mods.communitiesId;
	});
	return moderatorObject.moderators;
}

export async function getcommunityById(id) {
	return await prisma.communities.findFirst({
		where: { ...id }
	});
}

export async function getAllPostsFromCommunity(communityId) {
	const allPosts = await prisma.communities.findFirst({
		where: {
			id: communityId,
		},
		select: {
			posts: true
		}
	});
	let posts = [];
	for (let i = 0; i < allPosts.posts.length; i++) {
		posts.push(allPosts.posts[i]);
	}
	return posts;
}

export async function getPostFromCommunityById(communityId, postId) {
	const allPosts = await prisma.communities.findFirst({
		where: {
			id: communityId,
		},
		select: {
			posts: true
		}
	});
	for (let i = 0; i < allPosts.posts.length; i++) {
		if (allPosts.posts[i].id === postId)
			return allPosts.posts[i];
	}
	return null;
}

export async function deletePostFromCommunity(communityId, postId) {
	return prisma.posts.delete({
		where: { id: postId }
	});
}

// ------------------------- register functions
export async function registerCommunity({ name, description }) {
	let code = randomCodeGenerator(6);

	while (await getCommunityByNameAndCode(name, code)) {
		code = randomCodeGenerator(6);
	}

	return await prisma.communities.create({
		data: {
			...{ name, description, code }
		}
	});
}

export async function registerNewCommunityUser(communityId, userId) {
	const exists = await checkIfUserExists(userId);
	if (!exists) await registerUserId(userId);

	return await prisma.users.update({
		where: { id: userId },
		data: {
			communities: {
				connect: { id: parseInt(communityId) }
			}
		}
	});
}

export async function registerNewModerator(communityId, userId) {
	const exists = checkIfCommunityExists(communityId);
	if (!exists) return false;

	await prisma.moderators.create({
		data: {
			users: {
				connect: { id: userId }
			},
			communities: {
				connect: { id: communityId }
			}
		}
	});
	return true;
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

export async function deleteUserInsideCommunity(communityId, userId) {
	const success = await prisma.communities.update({
		where: { id: parseInt(communityId) },
		data: {
			users: {
				disconnect: {
					id: userId
				}
			}
		}
	});
	if (success) return true
	return false
}

export async function deleteCommunity(communityId) {
	await prisma.moderators.deleteMany({
		where: { communitiesId: parseInt(communityId) }
	});
	const succeded = await prisma.communities.delete({
		where: { id: parseInt(communityId) }
	});
	return succeded;
}

export async function createNewPost(userId, { communityId, title, description, image, productsId, servicesId }) {
	const data = {
		...{ title, description, image },
		creator: {
			connect: { id: userId }
		},
		community: {
			connect: { id: communityId }
		},
		product: {
			connect: { id: productsId }
		},
		service: {
			connect: { id: servicesId }
		}
	}
	if (productsId) {
		const product = await checkIfProductExists(productsId);
		console.log(product);
		if (!product) {
			await registerNewProduct(productsId, userId);
		}
	} else {
		delete data.product;
	}
	if (servicesId) {
		const service = await checkIfServiceExists(servicesId);
		if (!service) {
			await registerNewService(servicesId, userId);
		}
	} else {
		delete data.service;
	}
	return await prisma.posts.create({
		data: data
	})
}

export async function registerNewProduct(id, userId) {
	return await prisma.products.create({
		data: {
			id: id,
			user: { connect: { id: userId } }
		}
	});
}

export async function registerNewService(id, userId) {
	return await prisma.services.create({
		data: {
			id: id,
			user: { connect: { id: userId } }
		}
	});
}

export async function updateCommunity(communityData) {
	const id = communityData.id;
	delete communityData.id;
	return await prisma.communities.update({
		where: { id: id },
		data: {
			...communityData
		}
	});
}

// ------------------------- check functions


export async function checkIfServiceExists(serviceId) {
	return await prisma.services.findFirst({
		where: { id: parseInt(serviceId) },
		select: { id: true }
	});
}

export async function checkIfProductExists(productId) {
	return await prisma.products.findFirst({
		where: { id: parseInt(productId) },
		select: { id: true }
	});
}

export async function checkIfUserExists(id) {
	return await prisma.users.findFirst({
		where: { id }
	}) ? true : false;
}

export async function checkIfCommunityExists(id) {
	return await prisma.communities.findFirst({
		where: { id }
	}) ? true : false;
}

export async function getCommunityByNameAndCode(name, code) {
	return await prisma.communities.findFirst({
		where: { name, code }
	});
}

export async function checkCommunityCode(id, code) {
	const exists = await prisma.communities.findFirst({
		where: { id, code }
	});
	return exists ? true : false;
}

export async function checkIsUserAlreadyRegisteredInsideCommunity(communityId, userId) {
	const communities = await getAllComunitiesFromUser(userId);
	for (let i = 0; i < communities.length; i++) {
		if (communities[i].id == communityId) {
			return true;
		}
		console.log(`${userId} have ${communityId}, that is not ${communities[i].id}`);
	}
	return false;
}

export async function checkIfUserIsModerator(communityId, userId) {
	const moderatorList = await getAllModeratorsFromCommunity(communityId);
	for (let i = 0; i < moderatorList.length; i++) {
		if (moderatorList[i].usersId === userId) {
			return true;
		}
	}
	return false;
}

function randomCodeGenerator(size) {
	const baseChars = 'abcefghijklmnopqrstuvwxzy0123456789'
	let code = "";
	for (let i = 0; i < size; i++) {
		code += baseChars[Math.floor(Math.random() * baseChars.length)];
	}
	return code;
}