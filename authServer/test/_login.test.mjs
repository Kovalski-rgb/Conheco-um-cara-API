import '../code/_bin/dotenvsetup.mjs';
import '../code/lib/env.mjs';
import { getDefaultDummyCredentials } from "../code/lib/env.mjs";
import { expect } from 'chai';
import axios from "axios";

describe('Testing basic user login...', async () => {

    it('POST/users - should create a new user, return status as 200', async () => {
        const response = await axios.post(`http://localhost:3001/api/users`, getDefaultDummyCredentials());
        expect(response.status).to.equal(200);
    });

    it('POST/users/login - user should have a token if login was successful', async () => {
        const response = await axios.post(`http://localhost:3001/api/users/login`, getDefaultDummyCredentials());
        expect(response.data).to.have.property('token');
    });

    it('POST/users/login - user should NOT have a token (and return status 401) with wrong password', async () => {
        let credentials = getDefaultDummyCredentials();
        credentials.password = "00-WRONGpassword";
        try {
            const response = await axios.post(`http://localhost:3001/api/users/login`, credentials);
            expect(response.status).equal(401);
        } catch (error) { 
            expect(error.response.status).equal(401);
        }
    });
});