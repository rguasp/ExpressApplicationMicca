const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const contactformsSchema = new Schema ({
    firstname: String,
    lastname: String,
    email: String,
    subject: String,
    message: String,
    })
    const Contactform = mongoose.model('Contactform', contactformsSchema)

module.exports = Contactform;