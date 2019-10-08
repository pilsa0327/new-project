const db = require('./db');

module.exports = {
    comparePassword : function(id, password){
        db.query(`Select * From user_info Where userId = ?`, [id], function(err, userInfo){
            if (userInfo[0].password === password) {
                console.log(4)
                return true
            } else {
                console.log(5)
                
                return false
            }
        })
     
    }
}