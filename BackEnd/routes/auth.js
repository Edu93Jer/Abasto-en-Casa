const router = require('express').Router();
const passport = require('passport');

const {
  catchErrors, isLogged
} = require('../middlewares/middlewares')

const {
  signupPost, loginPost, logout, loginFacebook, loginFacebookCb, loginGoogle, loginGoogleCb, currentUser
} = require('../controllers/auth');

router.post('/signup', catchErrors(signupPost));
router.post('/login', loginPost);
router.get('/auth/facebook', loginFacebook);
router.get('/auth/facebook/callback', loginFacebookCb);
router.get('/auth/google', loginGoogle);
router.get('/auth/google/callback', loginGoogleCb);
router.get('/currentUser', isLogged, currentUser)
router.get('/logout', logout);

module.exports = router;
