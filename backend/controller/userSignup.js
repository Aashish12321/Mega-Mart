async function userSignUpController (req, resp){
    try {
        const {name, email, password} = req.body;

        if (!username){
            throw new Error('Please provide Username')
        }
        if (!email){
            throw new Error('Please provide Email')
        }
        if (!password){
            throw new Error('Please provide Password')
        }
        
    } catch (err) {
        resp.json({
            message: err,
            error: true,
            success: false
        })
    }
}