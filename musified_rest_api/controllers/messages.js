const router = require('express').Router();

router.get('/send', (req, res) => {
    console.log('message is sent');
    res.end();
})

module.exports = router;