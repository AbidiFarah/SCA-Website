const AuthController = require("../Controllers/auth.controller")
const { authenticate } = require("../config/jwt")


module.exports = (app) => {
  //Auth routes
  app.post("/api/register",AuthController.register)
  app.post("/api/login", AuthController.login)
  app.get("/api/users/getloggedinuser",
    authenticate,
    AuthController.getLoggedInUser
  );
  app.get("/api/logout", AuthController.logout)

 
}