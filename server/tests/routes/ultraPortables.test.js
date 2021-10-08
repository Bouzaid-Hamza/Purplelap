/* eslint-disable no-undef */
const request = require('supertest');
const UltraPortable = require('../../models/ultraPortable');

describe('/api/ultraPortables', () => {
    let server;
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        await server.close();
        await UltraPortable.deleteMany({});
    });
    describe('GET /', () => {
        it('should return a list of ultra laptops', async () => {
            const ultras = [
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

            await UltraPortable.collection.insertMany(ultras, (err) => {
                if (err) return console.log(err);
                console.log('Ultras added successfully');
            });

            const res = await request(server).get('/api/ultraPortables');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(ultras.length);
            expect(res.body.some(l => l.img === ultras[1].img)).toBeTruthy();
        });
    });
    describe('POST /', () => {
        it('should return 400 if req body not valid', async () => {
            const res = await request(server)
                .post('/api/ultraPortables')
                .send({ name: '' });

            expect(res.status).toBe(400);
        });

        it('should save the ultra laptop if it is valid', async () => {
            const ultra = {
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

            const ultraModel = new UltraPortable(ultra);
            await ultraModel.save();

            const res = await request(server)
                .post('/api/ultraPortables')
                .send(ultra);

            const ultraInDb = await UltraPortable.findOne({ name: ultra.name });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('price', ultra.price);
            expect(ultraInDb).not.toBeNull();
        });
    });
});
