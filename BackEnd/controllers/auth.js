const User = require('../models/User');
const passport = require('../config/passport');

exports.signupPost = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.register({ name, email }, password)
  passport.authenticate('local')(req, res, () => {
    res.status(201).json({ message: "User created and logged", user: req.user });
  });
}

exports.loginPost = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ err, info })
    if (!user) return res.status(401).json({ err: { ...info } })
    req.login(user, error => {
      if (error) return res.status(401).json({ error })
      return res.status(200).json({ user })
    })
  })(req, res, next)
}

exports.loginFacebook = passport.authenticate('facebook', { scope: ['email'] });

exports.loginFacebookCb = (req, res, next) => {
  passport.authenticate('facebook', { scope: ['email'] }, (err, user, info) => {
    if (err) return res.status(500).json({ err, info })
    if (!user) return res.status(401).json({ err, info })
    req.login(user, error => {
      if (error) return res.status(401).json({ error })
      return res.redirect('https://abasto-en-casa.now.sh/?status=success')
    })
  })(req, res, next)
}

exports.loginGoogle = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

exports.loginGoogleCb = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] }, (err, user, info) => {
    if (err) return res.status(500).json({ err, info })
    if (!user) return res.status(401).json({ err, info })
    req.login(user, error => {
      if (error) return res.status(401).json({ error })
      return res.redirect('https://abasto-en-casa.now.sh/?status=success')
    })
  }
  )(req, res, next)
}

exports.currentUser = (req, res) => res.status(200).json({ user: req.user })

exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'LoggedOut' });
};