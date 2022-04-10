const { readById } = require("../services/api");

module.exports = () => async(req, res, next) => {
    const id = req.params.id;
    try {
        const lesson = await readById(id); // TODO: check if .lean() does it's magic in the services (when building the client)
        lesson._ownerId = lesson.owner // TODO: check if the lesson have owner property
            // TODO: there will be only one admin account that will be able to create new records ( lessons ) thus the assignment on row 7 might break the things - check later
        res.locals.lesson = lesson;
        next();
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Record not found' });
    }
};