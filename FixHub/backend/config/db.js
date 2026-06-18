const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://Rupesh_yadaV12345:eNarQVGScqcLQnaP@cluster0.qrthelu.mongodb.net/fixhub?retryWrites=true&w=majority";
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
