import { prisma } from "../../lib/database.mjs";


// ------------------------- get commands
export async function getAllCommunities() {
	return await prisma.communities.findMany();
}

export async function getAllIds() {
	return await prisma.users.findMany({
		select: {
			id: true,
		},
	});
}

export async function getAllCommunityUsers(communityId) {
	const users = await prisma.communities.findMany({
		where: { id: parseInt(communityId) },
		select: { users: true }
	});
	console.log(users);
	return users;
}
// ------------------------- register commands
export async function registerCommunity({ name, description }) {
	const exists = await prisma.communities.findFirst({
		where: {
			name
		}
	});
	if (exists) return false;
	let code = name.substring(0, 3) + Math.floor(Math.random() * 101);
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

	if(!community) return false;

	await prisma.users.update({
		where: { id: userId },
		data: {
			Communities: {
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
	if(!community) return false;
	await prisma.moderators.create({
		data: {
			users: {
				connect: { id: userId }
			},
			Communities: {
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
