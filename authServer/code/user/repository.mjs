let users = [
    {id: 1, name:'admin', email:'admin@email.com', password: '00#ADmin', admin: true},
    {id: 2, name:'guest', email:'guest@email.com', password: '00#GUest', admin: false}
];

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