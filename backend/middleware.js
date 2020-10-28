const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  const token = jwt.sign({id}, process.env.TOKEN_SECRET);
  return token;
};

const authenticateToken = (req, res, next) => {
  // Hint: This is where you need to verify the JWT
  // Hint: You will see this function being passed to authenticated action routes in code. See backend/routes/users.js to explore

  const bearerHeader = req.headers["authorization"];
  
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const decodedId = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
    req.id = decodedId.id;
    next();
  } else res.sendStatus(403);
};

module.exports = { generateAccessToken, authenticateToken };
