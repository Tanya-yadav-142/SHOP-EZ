const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://shopezAdmin:97!!v8hi24R5AkL@cluster0.l5qqcrk.mongodb.net/shopez?retryWrites=true&w=majority");

        console.log("✅ MongoDB atlas Connected");
    } catch (error) {
        console.error("❌ DB Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;