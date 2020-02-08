const db = require('../database/database');

const TABLE_NAME = 'files';

module.exports = {
    async save(filename) {
        const result = await db.insert(TABLE_NAME, {file:filename});
        return {
            id:result.insertId,
            filename,
            file_url:`${process.env.BACKEND_API_URL}/files/${filename}`
        }
    },
    async findById(id) {
        const result = await db.fetch(['id','file'], TABLE_NAME,{id:id});
        return {
            id,
            filename: result[0].file,
            file_url:`${process.env.BACKEND_API_URL}/files/${result[0].file}`
        }
    }
}