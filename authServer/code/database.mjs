import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { debug, info } from "./logger.mjs";

export const prisma = new PrismaClient;

/*
async function makeRole(name) {
    let exists = await prisma.role.findUnique({ where: { name } })
    if (exists) {
        debug({description:`Role ${name} found.`});
        return;
    }
    await prisma.role.create(
        {
            data: { name }
        }
    );
    debug({description:'Role created!'});
}
*/

async function makeAdmin() {
    const email = process.env.DEFAULT_ADMIN_EMAIL;
    const password = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PWD,
        await bcrypt.genSalt()
    );

    const exists = await prisma.user.findFirst({
        where: {
            user: {
                some: {
                    isAdmin: true
                }
            }
        }
    });
    if (exists) {
        debug({description:`ADMIN found.`});
        return;
    }
    await prisma.user.create({
        data: {
            email,
            password,
            isAdmin: true,
            roles: {
                connect: [
                    { name: 'ADMIN' }, { name: 'USER' }
                ]
            }
        }
    });
    debug({description:'Default admin created!'});
}

export async function bootstrapDB() {
    debug({description:'checking initial data...'});
    //await makeRole('ADMIN');
    //await makeRole('USER');
    await makeAdmin();
    debug({description:"finished checking"})
}