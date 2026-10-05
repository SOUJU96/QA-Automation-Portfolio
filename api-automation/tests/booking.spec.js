const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const { BookingApi, validBooking } = require('../support/booking');

// Fixture: every test gets an authenticated client
const base = test.extend({
  api: async ({ request }, use) => {
    const api = new BookingApi(request);
    await api.authenticate();
    await use(api);
  },
});

const bookingSchema = {
  type: 'object',
  required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates'],
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    totalprice: { type: 'number' },
    depositpaid: { type: 'boolean' },
    bookingdates: {
      type: 'object',
      required: ['checkin', 'checkout'],
      properties: { checkin: { type: 'string' }, checkout: { type: 'string' } },
    },
  },
};

base.describe.serial('Booking lifecycle (create -> read -> update -> delete)', () => {
  let id;

  base('create booking returns an id and echoes the data', async ({ api }) => {
    const payload = validBooking();
    const res = await api.create(payload);
    expect(res.status()).toBe(200); // this demo API returns 200 on create
    const body = await res.json();
    id = body.bookingid;
    expect(id).toBeGreaterThan(0);
    expect(body.booking).toMatchObject(payload);
  });

  base('read booking matches schema', async ({ api }) => {
    const res = await api.get(id);
    expect(res.status()).toBe(200);
    const validate = new Ajv().compile(bookingSchema);
    const body = await res.json();
    expect(validate(body), JSON.stringify(validate.errors)).toBe(true);
  });

  base('update booking changes the data', async ({ api }) => {
    const res = await api.update(id, validBooking({ firstname: 'Updated', totalprice: 999 }));
    expect(res.status()).toBe(200);
    const check = await (await api.get(id)).json();
    expect(check.firstname).toBe('Updated');
    expect(check.totalprice).toBe(999);
  });

  base('delete booking, then it is gone', async ({ api }) => {
    const res = await api.remove(id);
    expect(res.status()).toBe(201); // quirk of this demo API
    expect((await api.get(id)).status()).toBe(404);
  });
});

test.describe('Negative cases', () => {
  test('update without a token is rejected', async ({ request }) => {
    const api = new BookingApi(request); // not authenticated
    const res = await api.update(1, validBooking());
    expect(res.status()).toBe(403);
  });

  test('bad credentials do not return a token', async ({ request }) => {
    const res = await request.post('/auth', { data: { username: 'admin', password: 'wrong' } });
    const body = await res.json();
    expect(body.token).toBeUndefined();
    expect(body.reason).toBe('Bad credentials');
  });

  test('unknown booking id returns 404', async ({ request }) => {
    expect((await new BookingApi(request).get(99999999)).status()).toBe(404);
  });
});

// Data-driven: one test per row
for (const { name, patch } of [
  { name: 'zero price', patch: { totalprice: 0 } },
  { name: 'long name', patch: { firstname: 'A'.repeat(200) } },
]) {
  base(`create booking with ${name} (observe + document behaviour)`, async ({ api }) => {
    const res = await api.create(validBooking(patch));
    expect([200, 400, 500]).toContain(res.status()); // TODO: decide the expected behaviour and assert it
  });
}
