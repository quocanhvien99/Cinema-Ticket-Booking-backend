const router = require('express').Router();
const movieRoute = require('./movie.route');
const eventRoute = require('./event.route');
const userRoute = require('./user.route');
const scheduleRoute = require('./schedule.route');
const bookRoute = require('./book.route');

router.use('/movies', movieRoute);
router.use('/events', eventRoute);
router.use('/user', userRoute);
router.use('/schedule', scheduleRoute);
router.use('/book', bookRoute);

module.exports = router;
