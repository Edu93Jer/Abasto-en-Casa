exports.catchErrors = fn => ( req, res, next ) =>
  fn( req, res, next ).catch( err => res.status( 500 ).json({ err }))

exports.isLogged = ( req, res, next ) =>
  req.isAuthenticated()
    ? next()
    : res.status( 401 ).json({ err: { msg: 'There is no user logged in' }})