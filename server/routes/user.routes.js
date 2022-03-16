const UserController = require('../Controllers/user.controller')


module.exports = (app) => {
  app.put("/api/:id", UserController.updateUser)
  app.delete("/api/:id", UserController.deleteUser)
  app.get("/api/:id", UserController.getUser)

  //app.get("/api/", UserController.getAllUser)

  app.get("/api/", UserController.getAllUser)

  
};