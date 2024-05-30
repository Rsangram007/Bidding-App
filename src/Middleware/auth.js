const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWTSKEY, (err, decoded) => {
      console.log("Decoded", decoded);
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
};

const Authorization  = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access Denied");
    }
    next();
  };
};

module.exports = {  Authorization, validateToken };
