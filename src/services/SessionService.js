const User = require('../models/User');
module.exports = {
    async store (email) {
        
        const found = await User.findByEmail(email);

        if(found) { 
            user = { _id:found.id + '', email };

            return user;
        }

        const inserted = await User.insertUser(email);
        
        return inserted;
    }
}