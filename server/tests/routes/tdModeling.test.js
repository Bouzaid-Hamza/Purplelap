/* eslint-disable no-undef */
const request = require('supertest');
const TdModeling = require('../../models/tdModeling');

describe('/api/tdModelings', () => {
    let server;
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        await server.close();
        await TdModeling.deleteMany({});
    });
    describe('GET /', () => {
        it('should return a list of TDMs laptops', async () => {
            const TDMs = [
                {
                    name: 'a'.repeat(12),
                    resolution: 'a'.repeat(12),
                    processor: 'a'.repeat(12),
                    graphics: 'a'.repeat(12),
                    ram: 'a'.repeat(12),
                    storage: 'a'.repeat(12),
                    os: 'a'.repeat(12),
                    img: 'a'.repeat(12),
                    price: 1
                },
                {
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
            ];

            await TdModeling.collection.insertMany(TDMs, (err) => {
                if (err) return console.log(err);
                console.log('TDMs added successfully');
            });

            const res = await request(server).get('/api/tdModelings');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(TDMs.length);
            expect(res.body.some(l => l.img === TDMs[1].img)).toBeTruthy();
        });
    });
    describe('POST /', () => {
        it('should return 400 if req body not valid', async () => {
            const res = await request(server)
                .post('/api/tdModelings')
                .send({ name: '' });

            expect(res.status).toBe(400);
        });

        it('should save the TDM laptop if it is valid', async () => {
            const TDM = {
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

            const tdMModel = new TdModeling(TDM);
            await tdMModel.save();

            const res = await request(server)
                .post('/api/tdModelings')
                .send(TDM);

            const tdMInDb = await TdModeling.findOne({ name: TDM.name });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('price', TDM.price);
            expect(tdMInDb).not.toBeNull();
        });
    });
});
