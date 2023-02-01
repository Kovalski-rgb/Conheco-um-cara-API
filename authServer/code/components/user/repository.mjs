import { prisma } from "../../database.mjs";
import bcrypt from "bcrypt";
//import { debug } from "../../logger.mjs";
import { badRequest, notFound, ServerError } from '../../errors.mjs';

const USER_FIELDS = {
    id: true,
    email: true,
    name: true,
    roles: true,
    password: false
}

export async function loadById(id) {
    const user = await prisma.user.findUnique({
        where: { id },
        select: USER_FIELDS
    });
    if (!user) return null;
    return user;
}

export async function loadByCredentials(email, password) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            ...USER_FIELDS,
            password: true
        }
    });

    ServerError
    .throwIfNot(user, `Not Found: ${username}`, notFound)
    .throwIfNot(await bcrypt.compare(password, user.password), 
        "Invalid credentials")
    if (!user) return null;
    if (!await bcrypt.compare(password, user.password))
        return null;

    delete user.password;
    return user;
}

export async function registerNewUser({ name, email, password, telephone }) {
    const exists = await prisma.user.findUnique({
        where: { email },
        select: USER_FIELDS
    });
    if (exists) return null;
    password = await bcrypt.hash(password, await bcrypt.genSalt());
    const newUser = { name, email, password, telephone };
    await prisma.user.create(
        {
            data: {
                ...newUser,
                roles: {
                    connect: [
                        { name: 'USER' }
                    ]
                }
            }
        }
    );
    delete newUser.password;
    return newUser;
}

export async function updateUserData({ id, name, email, password, telephone }) {
    const user =
    {
        name,
        email,
        password: password ? await bcrypt.hash(password, await bcrypt.genSalt()) : undefined,
        telephone: telephone
    }
    
    if(!user.name) delete user.name;
    if(!user.email) delete user.email;
    if(!user.password) delete user.password;
    if(!user.telephone) delete user.telephone;

    const updated = prisma.user.update({
        where: { 'id':id },
        data: {
            ...user
        }
    });
    console.log("updated user fields: ")
    console.log(updated);
    return updated
}

export async function removeUserById(id) {
    const exists = await prisma.user.findUnique({
        where: { id },
        select: USER_FIELDS
    });
    if (exists) {
        const deleted = await prisma.user.delete({
            where: { id }
        });
        return deleted;
    }
    return false;
}





