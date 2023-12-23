const mongoose = require("mongoose");
const mailSender =require('../utils/Mailsender')

const infoSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        trim:true,
    },
    company: {
        type:String,
        required:true,
    },
    message: {
        type:String,
        required:true    
    },
});

//a function -> to send emails
async function sendVerificationEmail(email, name) {
    try{
        const mailResponse = await mailSender(email,name, "Your response is submitted ");
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error) {
        console.log("error occured while sending mails: ", error);
        
    }
}

infoSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.name);
    next();
})
module.exports = mongoose.model("Info", infoSchema);