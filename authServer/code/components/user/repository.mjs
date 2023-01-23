let users = [
    {id: 1, name:'admin', email:'admin@email.com', password: '00#ADmin', telephone: '', admin: true},
    {id: 2, name:'guest', email:'guest@email.com', password: '00#GUest', telephone: '', admin: false}
];

let idCount = 2;

function formatUser(user) {
    if (!user) return user;    
    return {...user, password: undefined};
}

export async function loadById(id) {
    return formatUser(users.find(u => u.id === id));
}

export async function loadByCredentials(email, password) {
    return formatUser(
        users.find(u => 
            u.email === email && 
            u.password === password
        )
    );
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
  



