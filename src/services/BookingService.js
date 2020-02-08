const Booking = require('../models/Booking');
const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async store (data) {

        formattedData = {
            requested_date : data.date,
            interested_user_id : data.user,
            wanted_spot_id : data.spot
        };

        const bookingId = await Booking.create(formattedData);

        let booking = await Booking.getById(bookingId);

        const spot = await Spot.findById(booking.wanted_spot_id);

        const user = await User.findById(data.user);

        let formatedBooking = {
            _id: booking.id,
            spot,
            date: booking.requested_date,
            user
        }

        return formatedBooking;
    },

    async update (bookingId, approved) {
        await Booking.update(bookingId, approved);

        let booking = await Booking.getById(bookingId);

        const spot = await Spot.findById(booking.wanted_spot_id);

        const user = await User.findById(booking.interested_user_id);

        let formatedBooking = {
            _id: booking.id,
            spot,
            date: booking.requested_date,
            user,
            approved : booking.approved
        }

        return formatedBooking;
    }
}