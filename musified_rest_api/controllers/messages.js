const { deleteMessage, createNewMessage, getAllMessages } = require('../services/messages');

const router = require('express').Router();

router.get('/message', async(req, res) => {
    await getAllMessages();
    res.end();
})

router.post('/message', async(req, res) => {
    await createNewMessage();
    res.end();
})

router.delete('/message/:id', async(req, res) => {
    await deleteMessage(); // TODO - add the param  message id
    res.end();
})

module.exports = router;