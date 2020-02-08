const db = require('../database/database');

const TABLE_NAME = 'bookings';

module.exports = {
    async create(data) {
        const inserted = await db.insert(TABLE_NAME,data);
        
        return inserted.insertId;
    },
    async getById(bookingId) {
        const found = await db.fetch(['id', 'requested_date', 'approved', 'interested_user_id', 'wanted_spot_id'],TABLE_NAME,{id : bookingId});
        return found[0];
    },
    async update(bookingId, data) {
        const updated = await db.update(TABLE_NAME, bookingId, data);
        return bookingId;
    }
}