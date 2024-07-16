const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    playlists: [{playlist_id:{type:mongoose.Schema.Types.ObjectId, required:true},
    }]
})

const User = mongoose.model("User", UserSchema)
module.exports = User