const jwt = require('jsonwebtoken')


module.exports = function auth(req,res,next) {
    const token = req.header('x-auth-token')
    if (!token) 
        return res.status(401).send('access denied no token provided')

    try{
        const decoded = jwt.verify(token,'thisString');
        req.user = decoded;
        next()
        }
    catch{
        res.status(400).send('invalid token')
    }
    
}