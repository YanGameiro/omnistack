const File = require('../models/File');
const utils = require('../utils');

module.exports = {
    async save(filename) {
        filenameSanitized = utils.sanitizeFilename(filename);
        return await File.save(filenameSanitized);
    },
    async findById(id) {
        return File.findById(id);
    }

}