const CategoryController = require('../Controllers/cat.controller')


module.exports = (app) => {
  app.post("/api/cat/create", CategoryController.CreateCat)
  app.get("/api/cat/", CategoryController.GetCat)
  
}