const BookingService = require('../services/BookingService');

module.exports  = {
    async StorageEvent(req, res) {

        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await BookingService.store({
                user: user_id,
                spot: spot_id,
                date,
            });

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.status(200).json(booking);
    },

    async update (req, res) {
        try {
            const { approved } = req.body;
            const { booking_id }= req.params

            const booking = await BookingService.update(booking_id, {approved});

            const bookingUserSocket = req.connectedUsers[booking.user.id];

            if (bookingUserSocket) {
                req.io.to(bookingUserSocket).emit('booking_response', booking);
            }
            
            res.status(200).json(booking);
        } catch (e) {
            res.status(500).json(e.message);
        }
        
    }
};