const BlogController = require('../Controllers/blog.controller')


module.exports = (app) => {
  app.post("/api/blog/create", BlogController.createBlog)
  app.put("/api/blog/:id", BlogController.updateBlog)
  app.delete("/api/blog/:id", BlogController.deleteBlog)
  app.get("/api/blog/", BlogController.getBlog)
  app.get("/api/blog/getallblogs", BlogController.getAllBlog)
};