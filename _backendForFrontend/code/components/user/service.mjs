import { newAxios } from "../../lib/network.mjs";

export async function login({email, password}) {
    const axios = newAxios();  
    const response = await axios.post('http://localhost:3001/api/users/login', {  
        email: email,
        password: password
      });
    return response.data;
}

export async function registerUser({name, email, password}) {
  const axios = newAxios();  
  const response = await axios.post('http://localhost:3001/api/users', {  
      name: name,
      email: email,
      password: password
    });
  return response.data;
}







