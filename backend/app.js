const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT
require("./db")

app.use(cors())
app.use(express.json())
app.use("/api/user", require("./Routes/User")) 
app.use("/api/playlist", require("./Routes/Playlist")) 

app.listen(PORT, () => {
    console.log(`Server Live ${PORT}`)
})

