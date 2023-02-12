import { newAxios } from "../../lib/network.mjs";

export async function getAllUserIds() {
  return await getAllIdsFromUsers();
}

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

export async function listEveryUserFromCommunity(communityId) {
  return await getAllUsersFromCommunity(communityId);
}

export async function listEveryComunity() {
  return await getAllCommunities();
}

export async function listEveryComunityFromUser(id) {
  return await getAllComunitiesFromUser(id);
}

export async function enterCommunity(userId, { name, code }) {
  const exist = await checkCommunityCode(name, code);
  if (exist) {
    if (!(await checkIsUserAlreadyRegisteredInsideCommunity(name, userId))) {
      await registerNewCommunityUser(name, userId);
      return true;
    }
  }
  return false;
}

export async function removeUserFromCommunity(userId, communityName) {
  if (
    await checkIsUserAlreadyRegisteredInsideCommunity(communityName, userId)
  ) {
    console.log("registered");
    return await deleteUserInsideCommunity(communityName, userId);
  }
  if (await checkIfUserIsModerator(communityName, userId)) {
    console.log("mod");
    return await deleteUserInsideCommunity(communityName, userId);
  }
  console.log("get out");
  return false;
}
