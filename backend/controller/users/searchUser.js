const User = require("../../models/User");

async function searchUser(req, resp){
    try {
        // console.log(req.params.key);
        let users = await User.find(
            {
                '$or':[
                    // $options:'i'  is used for case-insensitive search.
                    {'name':{$regex:req.params.key, $options: 'i'}},     
                    {'email':{$regex:req.params.key, $options: 'i'}},
                    {'role':{$regex:req.params.key, $options: 'i'}}
                ]
            }
        );
        
        resp.status(200).json({
            message: "Searched Users fetched successful",
            data: users,
            error: false,
            success: true
        })
    } catch (err) {
        resp.status(400).json({
            // message: err.message || err,
            message: 'yo ta vayena',
            error: true,
            success: false
        })
    }
}

module.exports = searchUser;
