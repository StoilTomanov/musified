const router = require('express').Router();
const { isLogged, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const lessonServices = require('../services/api');
const userServices = require('../services/users');
const mapError = require('../utils/errorMapper');

router.get('/', async(req, res) => {
    try {
        if (req.user) {
            const currentUser = await userServices.getUserData(req.user._id)
            if (!currentUser.isAdmin) {
                const result = await lessonServices.getAvailableLessons(currentUser._id);
                res.status(200).json(result);
            } else {
                const result = await lessonServices.readAll();
                res.status(200).json(result);
            }
        } else {
            const result = await lessonServices.readAll();
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(404).json({ message: mappedError });
    };

    res.end();
});

router.get('/mylessons', isLogged(), async(req, res) => {
    try {
        const result = await lessonServices.getMyLessons(req.user._id);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(404).json({ message: mappedError });
    };

    res.end();
});

router.put('/comparequisresults/:id', isLogged(), async(req, res) => {
    const lessonId = req.params.id;
    const quizData = req.body.quizData;
    try {
        const result = await lessonServices.compareQuizResults(lessonId, quizData);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(404).json({ message: mappedError });
    };

    res.end();
});

router.get('/:id', preload(), async(req, res) => {
    try {
        const result = res.locals.lesson;
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(404).json({ message: mappedError });
    }

    res.end();
})

router.post('/', isLogged(), async(req, res) => {
    const lesson = {
        name: req.body.name,
        description: req.body.description,
        level: req.body.level,
        theory: req.body.theory,
        duration: req.body.duration,
        videoUrl: req.body.videoUrl,
        imagePreviewUrl: req.body.imagePreviewUrl,
        progress: req.body.progress,
        createdOn: req.body.createdOn,
        views: req.body.views,
        owner: req.user._id
    };

    try {
        const result = await lessonServices.create(lesson);
        res.status(201).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    };

    res.end();
});

router.put('/submitquiz/:id', isLogged(), preload(), isOwner(), async(req, res) => {
    const lessonId = req.params.id;
    const quizData = req.body.quizData;
    try {
        const result = await lessonServices.submitQuiz(lessonId, quizData);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    };

    res.end();
});

router.put('/:id', isLogged(), preload(), isOwner(), async(req, res) => {
    const id = req.params.id;
    const lesson = {
        name: req.body.name,
        description: req.body.description,
        level: req.body.level,
        duration: req.body.duration,
        videoUrl: req.body.videoUrl,
        imagePreviewUrl: req.body.imagePreviewUrl,
        progress: req.body.progress,
        createdOn: req.body.createdOn,
        views: req.body.views,
    };

    try {
        const result = await lessonServices.update(lesson, id);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    };

    res.end();
});

router.put('/updateprogress/:id', isLogged(), async(req, res) => {
    const lessonId = req.params.id;
    const userId = req.user._id;
    try {
        const result = await lessonServices.updateProgress(userId, lessonId, req.body.rating);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    };

    res.end();
});

router.put('/updateviewsscore/:id', isLogged(), async(req, res) => {
    const lessonId = req.params.id;
    try {
        const result = await lessonServices.updateViewsScore(lessonId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    };

    res.end();
});

// subscribe to lesson
router.put('/subscribe/:id', isLogged(), preload(), async(req, res) => {
    const lessonId = req.params.id;
    const userId = req.user._id;

    try {
        const result = await lessonServices.subscribeToLesson(lessonId, userId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    };
    res.end();
});

router.put('/unsubscribe/:id', isLogged(), preload(), async(req, res) => {
    const lessonId = req.params.id;
    const userId = req.user._id;

    try {
        const result = await lessonServices.unsubscribeToLesson(lessonId, userId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    };

    res.end();
});

router.delete('/:id', isLogged(), preload(), isOwner(), async(req, res) => { //TODO: consider adding isOwner guard
    const id = req.params.id;

    try {
        const result = await lessonServices.deleteRecordById(id);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    };

    res.end();
});

module.exports = router;