const jsonWeb = require("jsonwebtoken")

exports.tokenGenerate = async (id) => {
    let token = jsonWeb.sign({id}, process.env.JWT_SECRET, {expiresIn: "24h"})
    return token
}