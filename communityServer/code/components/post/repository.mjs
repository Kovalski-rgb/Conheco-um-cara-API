import { prisma } from "../../lib/database.mjs";


// ------------------------- get functions
export async function getAllComunitiesFromUser(id) {
	const userCommunities = await prisma.users.findMany({
		where: { id },
		select: { communities: true }
	});
	if (userCommunities.length === 0) return [];
	let communities = userCommunities[0].communities;
	return communities;
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

export async function deletePostFromCommunity(postId) {
	return await prisma.posts.delete({
		where: {
			id: postId
		}
	});
}

export async function getPostById(communityId, postId) {
	return await prisma.posts.findFirst({
		where: {
			id: postId,
			community: { id: communityId }
		}
	});
}

// ------------------------- register functions
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

export async function updatePost(postData) {
	const id = postData.postId;
	delete postData.postId;
	delete postData.communityId;
	return await prisma.posts.update({
		where: { id: id },
		data: {
			...postData
		}
	});
}

// ------------------------- check functions
export async function checkIfPostExists(id) {
	return await prisma.posts.findFirst({
		where: { id }
	}) ? true : false;
}

export async function checkIfCommunityExists(id) {
	return await prisma.communities.findFirst({
		where: { id }
	}) ? true : false;
}

export async function checkIsUserAlreadyRegisteredInsideCommunity(communityId, userId) {
	const communities = await getAllComunitiesFromUser(userId);
	for (let i = 0; i < communities.length; i++) {
		if (communities[i].id == communityId) {
			return true;
		}
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
