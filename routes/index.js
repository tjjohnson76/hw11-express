const router = require('express').Router();

const notesRouter = require('./notes.route');

router.use('/notes', notesRouter);


module.exports = router;
