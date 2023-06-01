const mongoose =require('mongoose');
const dotenv = require('dotenv').config({path: './config/.env'});



mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to mongoose successfully!");
  })
  .catch((err) => {
    console.log(err.message);
  }); 

module.exports = mongoose;