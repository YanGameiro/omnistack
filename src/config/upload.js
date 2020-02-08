const multer = require('multer');
const path = require('path');
const utils = require('../utils');

module.exports = { 
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','uploads'),
        filename:  (req, file, callback) => {
            const originalName = utils.sanitizeFilename(file.originalname);
            const ext = path.extname(originalName);
            const name = path.basename(originalName);
            callback(null, `${Date.now()}-${name}${ext}`);
        }
    }),
}