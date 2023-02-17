import '../code/_bin/dotenvsetup.mjs';
import '../code/lib/env.mjs';
import { expect } from 'chai';
import axios from "axios";
import { getDummy1Data, getDummy2Data } from '../code/lib/env.mjs';

describe(
    'Test community CRUD routes, needs auth server running to authenticate',
    async () => {
        let DUMMY1_AUTH_TOKEN_DATA;
        let DUMMY2_AUTH_TOKEN_DATA;

        it('POST/community should create a new community under the name "DummyCommunity0001", expect status 200', async () => {
            (await axios.post(`http://localhost:3001/api/users`, getDummy1Data()));
            (await axios.post(`http://localhost:3001/api/users`, getDummy2Data()));


            DUMMY1_AUTH_TOKEN_DATA = (await axios.post(`http://localhost:3001/api/users/login`, getDummy1Data())).data;
            DUMMY2_AUTH_TOKEN_DATA = (await axios.post(`http://localhost:3001/api/users/login`, getDummy2Data())).data;

            const response = await axios.post(`http://localhost:3003/api/community`,
                { 'name': 'DummyCommunity0001' },
                { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } });

            expect(response.status).to.equal(200);
        });

        it('POST/community/join should allow dummy2 to enter the created community, expect status 200', async () => {
            const communityData = (await axios.get(`http://localhost:3003/api/community/me`,
                { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } })).data;

            const response = await axios.post(`http://localhost:3003/api/community/join`,
                { 'name': communityData[0].name, 'code': communityData[0].code },
                { headers: { 'Authorization': `Bearer ${DUMMY2_AUTH_TOKEN_DATA.token}` } });

            expect(response.status).to.equal(200);
        });

        it('POST/community/join should refuse dummy2 to enter the same community twice, expect status 403', async () => {
            const communityData = (await axios.get(`http://localhost:3003/api/community/me`,
                { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } })).data;
            try {
                const response = await axios.post(`http://localhost:3003/api/community/join`,
                    { 'name': communityData[0].name, 'code': communityData[0].code },
                    { headers: { 'Authorization': `Bearer ${DUMMY2_AUTH_TOKEN_DATA.token}` } });

                expect(response.status).to.equal(403);
            } catch (err) {
                expect(err.response.status).to.equal(403);
            }
        });

        it('POST/community/leave dummy2 should leave the community, expect status 200', async () => {
            const communityData = (await axios.get(`http://localhost:3003/api/community/me`,
                { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } })).data;

            const response = await axios.post(`http://localhost:3003/api/community/leave/${communityData[0].id}`,
                {},
                { headers: { 'Authorization': `Bearer ${DUMMY2_AUTH_TOKEN_DATA.token}` } });

            expect(response.status).to.equal(200);
        });

        it('POST/community/leave dummy2 tried to leave a community it doesnt belong, expect status 404', async () => {
            const communityData = (await axios.get(`http://localhost:3003/api/community/me`,
                { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } })).data;
            try {
                const response = await axios.post(`http://localhost:3003/api/community/leave/${communityData[0].id}`,
                    {},
                    { headers: { 'Authorization': `Bearer ${DUMMY2_AUTH_TOKEN_DATA.token}` } });
                expect(response.status).to.equal(404);
            } catch (err) {
                expect(err.response.status).to.equal(404);
            }

        });

        it('GET/community/me should list the first and only community with name "DummyCommunity0001" from dummy1', async () => {
            const response = await axios.get(`http://localhost:3003/api/community/me`,
                { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } });
            expect(response.data[0].name).to.equal("DummyCommunity0001");
        });

        it('PUT/community should update the community name, expect status 200', async () => {
            const community = await axios.get(`http://localhost:3003/api/community/me`,
                { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } });
            const response = await axios.put(`http://localhost:3003/api/community`,
            { 'id':community.data[0].id, 'name': 'DummyCommunity0002' },
            { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } });
            expect(response.status).to.equal(200);
        });

        it('DELETE/community/delete should delete the community and dummies from database, expect status 200', async () => {
            const communityData = (await axios.get(`http://localhost:3003/api/community/me`,
                { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } })).data;
            await axios.delete(`http://localhost:3001/api/users/me`,
                { headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` } });

            await axios.delete(`http://localhost:3001/api/users/me`,
                { headers: { 'Authorization': `Bearer ${DUMMY2_AUTH_TOKEN_DATA.token}` } });

            const response = await axios.delete(`http://localhost:3003/api/community/${communityData[0].id}`,
                {
                    headers: { 'Authorization': `Bearer ${DUMMY1_AUTH_TOKEN_DATA.token}` }
                }
            );

            expect(response.status).to.equal(200);
        });

    })