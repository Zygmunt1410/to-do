const jwt = require("jsonwebtoken");

// Verify accessToken
function accessTokenVerify(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      error: "Brak tokena"
    });
  }
  const BEARER = "Bearer";
  const AUTHORIZATION_TOKEN = req.headers.authorization.split(" ");
  if (AUTHORIZATION_TOKEN[0] !== BEARER) {
    return res.status(401).send({
      error: "Token jest błędnie sformatowany"
    });
  }
  jwt.verify(AUTHORIZATION_TOKEN[1], "PrivateKey", function(err, decoded) {
    if (err) {
      return res.status(401).send({
        error: "Token nie jest poprawny"
      });
    }
    req.body.userId = decoded._id;
    next();
  });
}

module.exports = accessTokenVerify;
