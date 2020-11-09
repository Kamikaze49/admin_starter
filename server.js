// Importing dependencies
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

// AdminBro
const { default: AdminBro } = require('admin-bro')
const options = require("./admin.options")

// Importing Routers
const userRouter = require("./routes/userRouter")
const eventRouter = require("./routes/eventRouter")
const orderRouter = require("./routes/orderRouter")
const adminRouter = require("./routes/adminRouter")


// Initializing app
const app = express()

// Connecting Mongoose
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log(`Database connected`))

const db = mongoose.connection
db.on("error", (e)=>console.error(e))

// Adding middleware
app.use(express.json())

// Admin Bro
const admin = new AdminBro(options)
const router = adminRouter(admin)
app.use(admin.options.rootPath, router)

app.use("/uploads", express.static("uploads"))
  

// Adding Routers
// app.use("/admin", adminRouter)
app.use("/order", orderRouter)
app.use("/user", userRouter)
app.use("/event", eventRouter)

// Defining Port
const PORT = process.env.PORT || 3000

// Running server
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))