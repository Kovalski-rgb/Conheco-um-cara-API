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

export async function getAllModeratorsFromCommunity(communityName) {
	const moderatorObject = await prisma.communities.findFirst({
		where: { name: communityName },
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

export async function getCommunityId(communityName) {
	return await prisma.communities.findFirst({
		where: { name: communityName },
		select: { id: true }
	});
}

// ------------------------- register functions
export async function registerCommunity({ name, description }) {
	const exists = await prisma.communities.findFirst({
		where: {
			name
		}
	});
	if (exists) return false;
	let code = randomCodeGenerator(6);
	await prisma.communities.create({
		data: {
			...{ name, description, code }
		}
	});
	return true;
}

export async function registerNewCommunityUser(communityName, userId) {
	const community = await prisma.communities.findFirst({
		where: { name: communityName },
		select: { id: true }
	});
	if (!community) return false;


	const registeredUser = await prisma.users.findFirst({
		where: { id: userId }
	});
	if (!registeredUser) registerUserId(userId);

	await prisma.users.update({
		where: { id: userId },
		data: {
			communities: {
				connect: { id: parseInt(community.id) }
			}
		}
	});
	return true;
}

export async function registerNewModerator(communityName, userId) {
	const community = await prisma.communities.findFirst({
		where: {
			name: communityName
		}
	});
	if (!community) return false;
	await prisma.moderators.create({
		data: {
			users: {
				connect: { id: userId }
			},
			communities: {
				connect: { id: community.id }
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

export async function deleteUserInsideCommunity(communityName, userId) {
	const community = await prisma.communities.findFirst({
		where: { name: communityName },
		select: { id: true }
	});
	const success = await prisma.communities.update({
		where: { id: community.id },
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

export async function deleteCommunity(communityName) {
	const community = await getCommunityId(communityName);
	await prisma.moderators.deleteMany({
		where: {communitiesId: community.id }
	});
	const succeded = await prisma.communities.delete({
		where: { ...community }
	});
	return succeded;
}


// ------------------------- check functions
export async function checkCommunityCode(name, code) {
	const exists = await prisma.communities.findFirst({
		where: { name, code }
	});
	if (exists) return true;
	return false;
}

export async function checkIsUserAlreadyRegisteredInsideCommunity(communityName, userId) {
	const communities = await getAllComunitiesFromUser(userId);
	communities.map(c => {
		if (c.name === communityName)
			return true
	});
	return false;
}

export async function checkIfUserIsModerator(communityName, userId) {
	const moderatorList = await getAllModeratorsFromCommunity(communityName);
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