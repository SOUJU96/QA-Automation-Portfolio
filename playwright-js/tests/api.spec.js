const { test, expect } = require('@playwright/test');

const API = 'https://jsonplaceholder.typicode.com';

test('GET post returns expected fields', async ({ request }) => {
  const res = await request.get(`${API}/posts/1`);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toMatchObject({ id: 1, userId: 1 });
  expect(typeof body.title).toBe('string');
});

test('POST creates a resource', async ({ request }) => {
  const res = await request.post(`${API}/posts`, {
    data: { title: 'qa', body: 'practice', userId: 1 },
  });
  expect(res.status()).toBe(201);
  expect((await res.json()).id).toBeDefined();
});

test('unknown resource returns 404', async ({ request }) => {
  const res = await request.get(`${API}/posts/99999`);
  expect(res.status()).toBe(404);
});
