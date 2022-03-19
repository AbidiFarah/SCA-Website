const JobController = require("../Controllers/job.controller")


module.exports = (app) => {
  
  app.post("/api/job/create", JobController.createJob)
  app.put("/api/job/:id", JobController.updateJob)
  app.delete("/api/job/:id", JobController.deletejob)
  app.get("/api/job/", JobController.getAllJob)

}