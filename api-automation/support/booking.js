// Small API client + test data builder. Keeps tests readable and avoids repeating URLs/headers.
const validBooking = (overrides = {}) => ({
  firstname: 'Soujanya',
  lastname: 'QA',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
  additionalneeds: 'Breakfast',
  ...overrides,
});

class BookingApi {
  constructor(request) {
    this.request = request;
    this.token = null;
  }

  async authenticate() {
    const res = await this.request.post('/auth', {
      data: { username: 'admin', password: 'password123' },
    });
    this.token = (await res.json()).token;
    return this.token;
  }

  create(data) { return this.request.post('/booking', { data }); }
  get(id) { return this.request.get(`/booking/${id}`); }
  update(id, data) {
    return this.request.put(`/booking/${id}`, { data, headers: { Cookie: `token=${this.token}` } });
  }
  remove(id) {
    return this.request.delete(`/booking/${id}`, { headers: { Cookie: `token=${this.token}` } });
  }
}

module.exports = { BookingApi, validBooking };
