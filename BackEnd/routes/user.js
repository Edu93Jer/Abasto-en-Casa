const router = require('express').Router();


const{
 isLogged
} = require( '../middlewares/middlewares')


// Import Controllers

const {
 profileGet, profileEdit, profileDel
} = require( '../controllers/user')

// User CRUD Routes

//Create

//La creacion del usuario se hace con el signup

//Read

router.get('/profile', isLogged, profileGet)

//Update

router.patch('/profile/edit', profileEdit)

//Delete

router.delete('/profile/delete', profileDel)

module.exports = router;