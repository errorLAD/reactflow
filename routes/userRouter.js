const express = require('express')
const router = express.Router() 

const {user_creation, userlist ,usersingle,updateuser,deleteuser } = require("../Controllers/usercontroller")


router.get('/',userlist)
router.get('/:id',usersingle)
router.delete('/:id',deleteuser)
router.post('/user_creation',user_creation)
router.patch('/:id',updateuser)


module.exports = router