const router = require('express').Router();

const{ isLogged } = require( '../middlewares/middlewares')

const {
 profileGet, profileEdit, profileDel, createMessage,
} = require( '../controllers/user')

// User CRUD Routes

//Create

router.post('/mailbox', createMessage)

//Read

router.get('/profile', isLogged, profileGet)

//Update

router.patch('/profile/edit', isLogged, profileEdit)

//Delete

router.delete('/profile/delete', isLogged, profileDel)

module.exports = router;