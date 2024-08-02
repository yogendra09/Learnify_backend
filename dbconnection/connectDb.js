const mongoose = require("mongoose")

exports.dbConnectio = async (req, res, next) => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("data base connected");
    } catch (error) {
        console.log(error);
    }
}

