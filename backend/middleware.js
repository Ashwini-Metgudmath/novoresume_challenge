const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    const token = jwt.sign({id}, process.env.TOKEN_SECRET);
    return token;
}

const authenticateToken = (req, res, next) => {
    // Hint: This is where you need to verify the JWT
    // Hint: You will see this function being passed to authenticated action routes in code. See backend/routes/users.js to explore
    //console.log("token in middleware:"+req.headers["authorization"])
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
       // const bearer = bearerHeader.split(' ');
       // const bearerToken = bearer[1];
        req.token = bearerHeader;
        
        next();
    }
    else

    res.sendStatus(403);
    
}

module.exports = { generateAccessToken, authenticateToken };