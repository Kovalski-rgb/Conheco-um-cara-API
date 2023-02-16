import { newAxios } from "../../lib/network.mjs";

export async function createCommunity(userId, req) {
  const axios = newAxios();

  axios.interceptors.request.use(
    config => {
      config.headers.Authorization= req.header("Authorization");
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  const response = await axios.post(
    "http://localhost:3003/api/community/create",
    {
      userId: userId,
      headers: { Authorization: req.header("Authorization") },
      name: req.body.name,
      description: req.body.description
    }
  );
  return response.data;
}

export async function deleteTheCommunity(req){

  const axios = newAxios();
  const response = await axios.delete(
    "http://localhost:3003/api/community/delete",
    {
      headers: { Authorization: req.header("Authorization") },
      data: { ... req.body }
    }
  );
  return response.status;
}

export async function listEveryComunity() {
  const axios = newAxios();
  const response = await axios.get("http://localhost:3003/api/community/all");
  return response.data;
}

export async function listEveryComunityFromUser(req) {
  const axios = newAxios();
  const response = await axios.get("http://localhost:3003/api/community/me", {
    headers: { Authorization: req.header("Authorization") },
    id: req.user.id
  });
  return response.data;
}

export async function enterCommunity(req) {
  const axios = newAxios();
  
  axios.interceptors.request.use(
    config => {
      config.headers.Authorization= req.header("Authorization");
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );


  const response = await axios.post("http://localhost:3003/api/community/join",
  {
    headers: { Authorization: req.header("Authorization") },
    data: { ... req.body }
  }
);
return response.status;
}