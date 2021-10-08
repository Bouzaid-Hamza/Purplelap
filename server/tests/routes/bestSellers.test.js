/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
const { BestSeller } = require('../../models/bestSeller');
const Gaming = require('../../models/gaming');
const TdModeling = require('../../models/tdModeling');

describe('/api/bestSellers', () => {
    let server;
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        await server.close();
        await Gaming.deleteMany({});
        await TdModeling.deleteMany({});
        await BestSeller.deleteMany({});
    });
    describe('POST /', () => {
        it('should return 400 if req body is invalid', async () => {
            const res = await request(server)
                .post('/api/bestSellers')
                .send({ _id: new mongoose.Types.ObjectId(), category: 'Gaming' });

            expect(res.status).toBe(400);
        });
    });
    describe('POST /', () => {
        it('should save best seller if it is valid', async () => {
            const gLap = {
                name: 'a'.repeat(12),
                resolution: 'a'.repeat(12),
                processor: 'a'.repeat(12),
                graphics: 'a'.repeat(12),
                ram: 'a'.repeat(12),
                storage: 'a'.repeat(12),
                os: 'a'.repeat(12),
                img: 'a'.repeat(12),
                price: 1
            };

            const lap1 = new Gaming(gLap);
            await lap1.save();

            const res = await request(server)
                .post('/api/bestSellers')
                .send({ _id: lap1._id, category: lap1.category });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', lap1._id.toHexString());
            expect(res.body).toHaveProperty('category', lap1.category);
        });
    });
    describe('GET /', () => {
        it('should return list of best sellers', async () => {
            const gLap = {
                name: 'a'.repeat(12),
                resolution: 'a'.repeat(12),
                processor: 'a'.repeat(12),
                graphics: 'a'.repeat(12),
                ram: 'a'.repeat(12),
                storage: 'a'.repeat(12),
                os: 'a'.repeat(12),
                img: 'a'.repeat(12),
                price: 1
            };
            const tdLap = {
                name: 'a'.repeat(13),
                resolution: 'a'.repeat(13),
                processor: 'a'.repeat(13),
                graphics: 'a'.repeat(13),
                ram: 'a'.repeat(13),
                storage: 'a'.repeat(13),
                os: 'a'.repeat(13),
                img: 'a'.repeat(13),
                price: 1
            }

            const lap1 = new Gaming(gLap);
            const lap2 = new TdModeling(tdLap);
            await lap1.save();
            await lap2.save();

            const bs1 = new BestSeller({ _id: lap1._id, category: lap1.category });
            const bs2 = new BestSeller({ _id: lap2._id, category: lap2.category });
            await bs1.save();
            await bs2.save();

            const res = await request(server).get('/api/bestSellers');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(bs => bs.img === tdLap.img)).toBeTruthy();
        });
    });
});
