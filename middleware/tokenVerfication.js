const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res
      .status(401)
      .send({ error: "please Authenticate Using Valid Credentials " });
  }
    try {
    const data = jwt.verify(bearerHeader, "isshhhh heyy im a secert");
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "please Authenticate Using Valid Credentials " });
  }
}

// EXPORTING TOKEN VERIFICATION FUNCTION
module.exports = verifyToken;
