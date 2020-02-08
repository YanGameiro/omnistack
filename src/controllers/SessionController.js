const sessionService = require('../services/SessionService');

module.exports = {

    async store(req, res) {
        try{
            const { email } = req.body;
            const result = await sessionService.store(email);

            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}