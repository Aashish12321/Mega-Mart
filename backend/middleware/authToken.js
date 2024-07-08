const jwt = require('jsonwebtoken');

async function authToken(req, resp, next){
    try {
        const token = req.headers['authorization'];
        
        if(!token){
            console.log('Permission denied ! Please provide the token');
            throw new Error('Permission denied ! Please provide the token');
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            // console.log("decoded",decoded._id);
            if (err) {
                console.log(err);
                throw new Error('Unauthorized! Invalid token');
            }

            req.userId = decoded._id
            next();
        });
    } catch (err) {
        resp.status(400).json({
            message: err.message,
            data: [],
            error: true,
            success: false
        })
    }
}

module.exports = authToken;

