const mongoose = require("mongoose")
const MONGO_URI = "mongodb+srv://aditya:aditya@react-express-mongodb.sxonfox.mongodb.net/React-Express-MongoDB?retryWrites=true&w=majority&appName=React-Express-MongoDB"

mongoose.connect(MONGO_URI).then(() => {
    console.log("DB Connected")
})
.catch(err => {
    console.log(err.message)
})