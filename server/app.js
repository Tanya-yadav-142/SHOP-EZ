/* 

================== Most Important ==================
* Issue 1 :
In uploads folder you need create 3 folder like bellow.
Folder structure will be like: 
public -> uploads -> 1. products 2. customize 3. categories
*** Now This folder will automatically create when we run the server file

* Issue 2:
For admin signup just go to the auth 
controller then newUser obj, you will 
find a role field. role:1 for admin signup & 
role: 0 or by default it for customer signup.
go user model and see the role field.

*/






const express = require("express");
const app = express();
require("dotenv").config();

// try{
//   const path = require("path");

// // allow browser to access uploaded images
//    app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// }catch(err){
//   console.log("This ia causing error"+err);
// }

const path = require("path");

// allow browser to access uploaded images
   app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

   
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");



// Import Router
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/products");

const orderRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const customizeRouter = require("./routes/customize");
// Import Auth middleware for check user login or not~
const { loginCheck } = require("./middleware/auth");
const CreateAllFolder = require("./config/uploadFolderCreateScript");

/* Create All Uploads Folder if not exists | For Uploading Images */
CreateAllFolder();



// Database Connection
const connectDB = require("./config/db");

// DB connection
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/order", require("./routes/orders"));

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);







app.use("/api/order", orderRouter);

app.use("/api/customize", customizeRouter);







// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
