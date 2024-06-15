const jwt = require('jsonwebtoken');

async function authToken(req, resp, next){
    try {
        const token = req.cookies.token

        if(!token){
            console.log('user not login, please provide the token');
            throw new Error('User not login');
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            // console.log("decoded",decoded._id);
            if (err) {
                console.log(err);
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

