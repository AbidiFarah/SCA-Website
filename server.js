const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const req = require("express/lib/request");
const dotenv = require('dotenv').config()


const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json())
app.use(cookies())

require("./server/config/mongoose.config")()
require("./server/routes/auth.routes")(app)
require("./server/routes/user.routes")(app)


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT} !`))

