const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    //return 'yourJWT';
    //console.log("middleware"+ id)
    const token = jwt.sign({id}, 'secretkey');
    //console.log("token in middleware: "+token);
    return token;
}

const authenticateToken = (req, res, next) => {
    // Hint: This is where you need to verify the JWT
    // Hint: You will see this function being passed to authenticated action routes in code. See backend/routes/users.js to explore
    //console.log("token in middleware:"+req.headers["authorization"])
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        
        next();
    }
    else
    res.sendStatus(403);
    
}

module.exports = { generateAccessToken, authenticateToken };