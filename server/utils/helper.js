const moment = require('moment');

module.exports = {
    ensureAuthenticated : (req,res,next) => {
        if(req.isAuthenticated()){
            return next();
        }

        req.flash('error_msg','You are not authenticated');
        res.redirect('/users/login');
    },
    generateMessage : (from, text) => {
        return {
            from,
            text,
            createdAt: moment().valueOf()
        };
    },
    generateLocationMessage : (from, latitude, longitude) => {
        return {
            from,
            url: `https://www.google.com/maps/search/${latitude},${longitude}`,
            createdAt: moment().valueOf()
        };
    }
};