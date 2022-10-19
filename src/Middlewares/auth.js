const jwt = require('jsonwebtoken');


exports.authenticated = async (req,res,next) => {
    const authHeader = req.get("Authorization");
try {
    if(!authHeader) {
        const error = new Error("cant authorize!")
        error.statusCode = 500;
        throw error
    } 
     const token = authHeader.split(" ")[1]
     const decodedToken = jwt.verify(token , process.env.JWT_SECRET)
     if(!decodedToken) {
        const error = new Error("user isnt authorized!")
        error.statusCode = 421;
        throw error
     } else {
        req.userId = decodedToken.userId;
        req.userRole = decodedToken.userRole
        next()
     }
 } catch (err) {
    next(err)
}
}