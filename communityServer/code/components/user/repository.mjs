import { prisma } from "../../lib/database.mjs";

export async function getAllIds() {
	const users = await prisma.users.findMany({
		select: {
			id: true,
		},
	});
	console.log(users);
	return users;
}

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

export async function registerNewModerator(communityName, userId) {
	const community = await prisma.communities.findFirst({
		where: {
			name: communityName
		}
	});
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
