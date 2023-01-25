import { prisma } from "../../database.mjs";
import bcrypt from "bcrypt";

const USER_FIELDS = {
    id: true,
    email: true,
    name: true,
    roles: true,
    password: false
}

export async function loadById(id) {
    const user = await prisma.user.findUnique({
        where: {id},
        select: USER_FIELDS
    });
    if(!user) return null;
    return user;
}

export async function loadByCredentials(email, password) {
    const user = await prisma.user.findUnique({
        where: {email},
        select: {
            ...USER_FIELDS,
            password: true
        }
    });
    if(!user) return null;
    if(!await bcrypt.compare(password, user.password))
        return null;
    
    delete user.password;
    return user;
}

export async function findEmail(email){
    return users.find(u=>u.email === email); 
}

export async function registerNewUser({name, email, password}){
    if(await findEmail(email)){
        return null;
    }
    idCount++;
    const newUser = {id: idCount, name, email, password, telephone:'', admin:false};
    users.push(newUser);
    return newUser;
}

export async function updateUserData({id, name, email, password, telephone}){
    const index = users.findIndex(u => u.id === id)

    users[index].name = name
    users[index].email = email
    users[index].password = password
    users[index].telephone = telephone

    return {name, email, password, telephone}
}

export async function removeUserById(id) {
    const index = users.findIndex(u => u.id === id);
    if(index === -1) return false;
    users.splice(index, 1);
    return true;
  }
  



