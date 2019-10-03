const multer = require('multer');
const path = require('path');

module.exports = { 
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','uploads'),
        filename:  (req, file, callback) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname);
            callback(null, `${Date.now()}-${name}${ext}`);
        }
    }),
}