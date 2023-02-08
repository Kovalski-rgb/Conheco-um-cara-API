import { newAxios } from "../../lib/network.mjs";
import { filterCommunityByUserId } from "./repository.mjs";

export async function getMyCommunities() {
  const axiosUser = newAxios();
  const responseUser = await axiosUser.get(
    "http://localhost:3001/api/users/me"
  ); //retorna inf do usuario

  const axiosCommunity = newAxios();
  const responseCommunity = await axiosCommunity.get(
    "http://localhost:3003/api/communities"
  ); //retorna lista com informações de todas comunidades

  return await filterCommunityByUserId(responseCommunity.data, responseUser.Id); //seleciona apenas as comunidades do usuario e retorna ao BFF
}

export async function getMyPosts() {
  const axiosUser = newAxios();
  const responseUser = await axiosUser.get(
    "http://localhost:3001/api/users/me"
  ); //retorna inf do usuario

  const axiosCommunity = newAxios();
  const responseCommunity = await axiosCommunity.get(
    "http://localhost:3003/api/communities"
  ); //retorna lista com informações de todas comunidades

  return await filterCommunityByUserId(responseCommunity.data, responseUser.Id); //seleciona apenas as comunidades do usuario e retorna ao BFF
}

export async function getMyMessages() {

  }

