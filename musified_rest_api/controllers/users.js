const router = require('express').Router();
const { isGuest, isLogged } = require('../middlewares/guards');
const { register, login, logout, getUserData, updateUser } = require('../services/users');
const mapError = require('../utils/errorMapper');

router.post('/login', isGuest(), async(req, res) => {
    try {
        const result = await login(req.body.username.trim(), req.body.password.trim());
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    }
    res.end();
});

router.post('/register', isGuest(), async(req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.username.trim() == '' || req.body.email.trim() == '') {
            throw new Error('Username, email and passwords are required.')
        }

        const result = await register(req.body.username.trim(), req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.status(201).json(result);

    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    }
    res.end();
});

router.get('/logout', isLogged(), (req, res) => {
    if (req.user) {
        logout(req.user.token);
    }
    res.status(204).end();
});

router.get('/readuser', isLogged(), async(req, res) => {
    try {
        const userId = req.user._id;
        const result = await getUserData(userId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    }
    res.status(204).end();
});

router.put('/:id', isLogged(), async(req, res) => {
    try {
        const userId = req.params.id;
        const lessonId = req.body.lessonId;
        const action = req.body.action;
        const result = await updateUser(userId, lessonId, action);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        const mappedError = mapError(error);
        res.status(400).json({ message: mappedError });
    }
    res.status(204).end();
});

module.exports = router;