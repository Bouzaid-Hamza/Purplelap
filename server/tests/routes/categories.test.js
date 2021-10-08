/* eslint-disable no-undef */
const request = require('supertest');
const { Category } = require('../../models/category');

describe('/api/categories', () => {
    let server;
    beforeEach(() => {
        server = require('../../index');
    });

    afterEach(async () => {
        await server.close();
        await Category.deleteMany({});
    });

    describe('GET /', () => {
        it('should return list of categories', async () => {
            const categories = [
                { name: 'ultraPortable', img: 'a'.repeat(12) },
                { name: 'business', img: 'a'.repeat(13) },
                { name: 'gaming', img: 'a'.repeat(14) },
                { name: '3d-Modeling', img: 'a'.repeat(15) }
            ];

            await Category.collection.insertMany(categories, err => {
                if (err) return console.log(err);
                console.log('categories added successfully');
            });

            const res = await request(server).get('/api/categories');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(categories.length);
            expect(res.body.some(c => c.name === 'gaming')).toBeTruthy();
            expect(res.body.some(c => c.img === 'a'.repeat(13))).toBeTruthy();
        });
    });
    describe('POST /', () => {
        it('should save the category if it is valid', async () => {
            const res = await request(server)
                .post('/api/categories')
                .send({ name: 'ultraPortable', img: 'a'.repeat(12) })

            const category = await Category.findOne({ name: 'ultraPortable' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('img');
            expect(category).not.toBeNull();
        });
    });
});
