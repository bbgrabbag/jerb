
require("dotenv").config();

module.exports = {
    port: process.env.PORT || 8080,
    secret: process.env.SECRET,
    db: process.env.MONGODB_URI
}
