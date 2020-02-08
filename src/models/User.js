const db = require('../database/database');

const TABLE_NAME = 'users';

module.exports = {
    async findByEmail(email) {

        const result = await db.fetch(['id', 'email'], TABLE_NAME, {email});
                
        return result[0];
    },
    async findById(id) {

        const result = await db.fetch(['id', 'email'], TABLE_NAME, {id});
                
        return result[0];
    },

    async insertUser (email) {

        const result = await db.insert(TABLE_NAME, {email});
        
        return {_id: result.insertId, email};
    }
}