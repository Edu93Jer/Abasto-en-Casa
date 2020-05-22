const router = require('express').Router();

const { isLogged } = require('../middlewares/middlewares')

const {
 profileGet, profileEdit, profileDel, createMessage,
} = require('../controllers/user')


router.post('/mailbox', createMessage)


router.get('/profile', isLogged, profileGet)


router.patch('/profile/edit', isLogged, profileEdit)


router.delete('/profile/delete', isLogged, profileDel)

module.exports = router;