const Spot = require('../models/Spot');
const FileService = require('../services/FileService');

module.exports = {
    async store(spotData) {
        const inserted = await Spot.insertSpot(spotData);

        return inserted;
    },

    async index(filter) {
        let spots = [];
        if (filter.ownerId) {
            spots = await Spot.findByOwner(filter.ownerId);
        }
        if (filter.tech) {
            spots = await Spot.findByTech(filter.tech);
        }
        if (!filter.tech && !filter.ownerId) {
            spots = await Spot.index();
        }

        let formattedSpots = [];

        for (i = 0; i < spots.length; i++) {

            let thumbnail_url = `http://192.168.1.6:3333/assets/default-image.jpg`;
            if (spots[i].file) {
                thumbnail_url = `${process.env.BACKEND_API_URL}/files/${spots[i].file}`;
            }

            formattedSpots.push({
                techs: spots[i].techs.split(',').map(tech => tech.trim()),
                _id: spots[i].id + '',
                user: spots[i].owner_user_id + '',
                thumbnail: spots[i].file,
                thumbnail_url,
                company: spots[i].company_name,
                price: spots[i].price,
                id: spots[i].id + ''
            });
        }

        return formattedSpots;
    }
}