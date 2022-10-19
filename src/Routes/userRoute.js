const {Router} = require('express');
const router = new Router()

const userController = require('../Controllers/userController');
const { authenticated } = require('../Middlewares/Auth');

//post createUser
router.post("/register" , userController.createUser)

//put validateUser
router.put("/validation" , userController.verifyEmail)

//get userLogin
router.get("/login" , userController.handleLogin)

//delete deleteUseer
router.delete("/deleteUser/:id", authenticated , userController.deleteUser)

//put editUser
router.put("/editUser/" , authenticated , userController.editUser)

//get allUsersList
router.get("/listall" , authenticated , userController.listAllUsers)
module.exports = router