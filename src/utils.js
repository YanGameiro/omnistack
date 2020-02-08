module.exports = {
    sanitizeFilename(filename) {
        const final = filename.replace(/\s/gi, '_');
        return final;
    }
}