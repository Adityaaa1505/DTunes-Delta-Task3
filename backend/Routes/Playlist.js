const express = require("express")
const Playlist = require("../Models/Playlist")
const router = express.Router()

router.get("/", async (req, res) => {
    const playlists = await Playlist.find()
    res.json({playlists, success:true, message:"Playlists Found"})
})

router.post("/like", async (req, res) => {
    const { song_mp3, song_title, song_artist, song_thumbnail } = req.body
    const playlist = await Playlist.findOne({title: "Liked Songs"})
    playlist.songs.push({ song_mp3, song_title, song_artist, song_thumbnail })
    playlist.save()
    return res.json({ playlist, success: true, message: "Playlist Created" }) 
})

router.post("/create", async (req, res) => {
    const { title, singers, songs } = req.body
    const playlist = await Playlist.create({ title, singers, songs })
    return res.json({ playlist, success: true, message: "Playlist Created" })
})

module.exports = router     