import '../code/_bin/dotenvsetup.mjs';
import '../code/lib/env.mjs';
import { getDefaultDummyCredentials } from "../code/lib/env.mjs";
import { expect } from 'chai';
import axios from "axios";

describe('Testing /me routes (subconsequently all 6 profile routes) after auth', async () => {

    it('GET/users/me, should auth and return user data with the same id as the logged user', async () => {
        const authUser = await axios.post(`http://localhost:3001/api/users/login`, getDefaultDummyCredentials());
        const AUTH_TOKEN = authUser.data.token;

        const userData = await axios.get(`http://localhost:3001/api/users/me`,
            { headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` } });
        expect(authUser.data.id).to.equal(userData.data.id);
    });

    it('PUT/users/me, should auth and return updated user data', async () => {
        const authUser = await axios.post(`http://localhost:3001/api/users/login`, getDefaultDummyCredentials());
        const AUTH_TOKEN = authUser.data.token;

        const userData = await axios.put(`http://localhost:3001/api/users/me`,
            { "email": "updatedDummy@email.com" },
            { headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` } });
        expect(authUser.data.email).to.not.equal(userData.data.email);
    });

    it('DELETE/users/me, should auth and delete currently logged user', async () => {
        let credentials = getDefaultDummyCredentials();
        credentials.email = 'updatedDummy@email.com';
        const authUser = await axios.post(`http://localhost:3001/api/users/login`, credentials);
        const AUTH_TOKEN = authUser.data.token;

        const response = await axios.delete(`http://localhost:3001/api/users/me`,
            { headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` } });
        expect(response.status).to.equal(200);
    });


    it('GET/users/me, should NOT auth and return "Guest user" as response', async () => {
        const response = await axios.get(`http://localhost:3001/api/users/me`);
        expect(response.data).to.equal('Guest user');
    });

    it('PUT/users/me, should NOT auth and return 401', async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/users/me`, { "email": "updatedDummy@email.com" });
            expect(response.status).to.equal(401);
        } catch (err) {
            expect(err.response.status).to.equal(401);
        }
    });

    it('DELETE/users/me, should NOT auth and return 401', async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/users/me`);
            expect(response.status).to.equal(401);
        } catch (err) {
            expect(err.response.status).to.equal(401);
        }
    });

});