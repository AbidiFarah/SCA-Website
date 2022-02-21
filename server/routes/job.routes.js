const JobController = require('../Controllers/job.controller')


module.exports = (app) => {
  app.post("/api /create", JobController.createJob)
  app.put("/api /:id", JobController.updateJob)
  app.delete("/api /:id", JobController.deleteJob)
  app.get("/api /:id", JobController.getJob)
  
 

};