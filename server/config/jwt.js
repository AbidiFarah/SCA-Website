const jwt = require("jsonwebtoken")

module.exports.secret = process.env.SECRET
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  })
}

module.exports.createActivationToken = (payload)  => {
  return jwt.sign( payload.toJSON() , process.env.ACTIVATION_TOKEN_SECRET , {expiresIn: '5m'}) 
}

module.exports.createAccessToken = (payload)  => {
  return jwt.sign(payload.toJSON(), process.env.ACCESS_TOKEN_SECRET , {expiresIn: '15m'})
}

module.exports.createRefreshToken = (payload)  => {
  return jwt.sign(payload.toJSON() , process.env.REFRECH_TOKEN_SECRET , {expiresIn: '7d'})
}