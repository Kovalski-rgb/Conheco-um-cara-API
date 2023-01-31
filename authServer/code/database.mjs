import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { debug, info } from "./logger.mjs";

export const prisma = new PrismaClient;


async function makeAdmin() {
    const email = process.env.DEFAULT_ADMIN_EMAIL;
    const password = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PWD,
        await bcrypt.genSalt()
    );

    const exists = await prisma.user.findFirst({
        where: { isAdmin: true }
    });
    if (exists) {
        debug({description:`ADMIN found.`});
        return;
    }
    await prisma.user.create({
        data: {
            email,
            password,
            name: "ADMIN",
            isAdmin: true
        }
    });
    debug({description:'Default admin created!'});
}


export async function bootstrapDB() {
    debug({description:'checking initial data...'});
    await makeAdmin();
    debug({description:"finished checking"})
}