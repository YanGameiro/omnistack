const User = require('../models/User');
const SpotService = require('../services/SpotService');
const FileService = require('../services/FileService');

module.exports = {

    async index (req, res) {
        const filterBy = req.query; 

        const spots = await SpotService.index(filterBy);
               
        return res.json(spots);
    },
    
    async store(req, res) {

        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const savedFile = await FileService.save(filename);

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({error: 'error message'});
        }

        const spot = await SpotService.store({
            owner_user_id: user_id,
            thumbnail_image_id: savedFile.id,
            company_name: company,
            techs,
            price
        });

        
        return res.json({
            techs: techs.split(',').map(tech =>tech.trim()),
            _id: spot.id,
            user: spot.spotData.owner_user_id,
            thumbnail: '1580150649451-coworkdelhi.jpg.jpg',
            company:spot.spotData.company_name,
            price:spot.spotData.price
        });
    }
}