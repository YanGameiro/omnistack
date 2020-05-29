const db = require('../database/database');

const TABLE_NAME = 'spots';

module.exports = {
    async insertSpot(spotData) {

        if (spotData.price == '') {
            delete spotData.price;
        }

        const result = await db.insert(TABLE_NAME, spotData);

        return { id: result.insertId, spotData };
    },
    async index() {
        let sql = 'select s.id, s.techs, s.owner_user_id, f.`file`, s.company_name, s.price from spots as s join files as f on s.thumbnail_image_id = f.id';
        return await db.query(sql, []);
    },
    async findByTech(tech) {

        let sql = 'select s.id, s.techs, s.owner_user_id, f.`file`, s.company_name, s.price from spots as s join files as f on s.thumbnail_image_id = f.id where s.techs LIKE \'%' + tech + '%\';';
        const result = await db.query(sql, []);

        return result;
    },
    async findByOwner(ownerId) {

        const result = await db.query(
            'select s.id, f.id, s.techs, s.owner_user_id, f.`file`, s.company_name, s.price from spots as s join files as f on s.thumbnail_image_id = f.id where s.owner_user_id = ?;',
            [ownerId]
        );

        return result;
    },
    async findById(spotId) {
        const result = await db.fetch(
            ['id', 'techs', 'owner_user_id', 'thumbnail_image_id', 'company_name', 'price'],
            TABLE_NAME, { id: spotId }
        );

        formattedSpot = {
            techs: result[0].techs.split(',').map(tech => tech.trim()),
            _id: result[0].id,
            user: result[0].owner_user_id,
            thumbnail: '1580150649451-coworkdelhi.jpg.jpg',
            company: result[0].company_name,
            price: result[0].price
        }

        return formattedSpot;
    }
}