require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
const connectdbs = require("./database/connection");
const port = process.env.PORT || 8000;
const app = express();
const Post = require("./database/Models/Post");
const User = require("./database/Models/User");
const {users,posts} = require("./data/inputData");
const authroute = require("./Routes/auth-route");
const userroute = require("./Routes/user-route");
const postroute = require("./Routes/post-route");
const errorMiddleWare = require("./Middlewares/error-middleware");
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));


// cors options

const corsOptions = {
  origin:"http://localhost:5173",
  methods:"POST,GET,PUT,DELETE,PATCH",
  credentials:true
}

// Routes

app.use(cors(corsOptions));
app.use("/api/auth", authroute);
app.use("/api/user", userroute);
app.use("/api/post", postroute);
app.use(errorMiddleWare);

connectdbs().then(() => {
  app.listen(port, () => {
    console.log(`listening at port ${port}`);
  });
});
