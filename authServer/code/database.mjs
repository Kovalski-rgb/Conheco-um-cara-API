// todo: initialize mysql server, install mariadb - https://www.geeksforgeeks.org/how-to-install-and-configure-mysql-on-arch-based-linux-distributionsmanjaro/
// npx prisma migrate dev
// config local server at .env

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const prisma = new PrismaClient;

async function makeRole(name) {
    let exists = await prisma.role.findUnique({ where: { name } })
    if (exists) {
        console.log(`   Role ${name} found.`);
        return;
    }
    await prisma.role.create(
        {
            data: { name }
        }
    );
    console.log('Role created!');
}

async function makeAdmin() {
    const email = process.env.DEFAULT_ADMIN_EMAIL;
    const password = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PWD,
        await bcrypt.genSalt()
    );

    const exists = await prisma.user.findFirst({
        where: {
            roles: {
                some: {
                    name: 'ADMIN'
                }
            }
        }
    });
    if (exists) {
        console.log(`   ADMIN found.`);
        return;
    }
    await prisma.user.create({
        data: {
            email,
            password,
            name: "ADMIN",
            roles: {
                connect: [
                    { name: 'ADMIN' }, { name: 'USER' }
                ]
            }
        }
    });
    console.log('Default admin created!');
}

export async function bootstrapDB() {
    console.log('checking initial data...');
    await makeRole('ADMIN');
    await makeRole('USER');
    await makeAdmin();
    console.log("finished checking")
}