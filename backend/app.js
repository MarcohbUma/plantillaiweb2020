const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
const express = require('express');
const mongoose = require('mongoose');
const formData = require("express-form-data");
const bodyParser = require('body-parser');
const os = require("os");
const morgan = require('morgan');
const port = process.env.PORT || 3030;
const mongodb = process.env.MONGODB_URI ;//||"mongodb://localhost:27017/parcial3templatesDB" || ;
//const mongodb = "mongodb+srv://MarcohbUma:mhbiweb2020@mhbweb.zggno.mongodb.net/parcial3testdb?retryWrites=true&w=majority";
const app = express();
//.env

//parser
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false }));

// for parsing multipart/form-data
// parse data with connect-multiparty.
app.use(
    formData.parse({
        uploadDir: os.tmpdir(),
        autoClean: true,
    })
);
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

console.log(result.parsed);
//Middleware
app.use(morgan("dev"));
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Db
mongoose
    .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("\x1b[32mSUCCESS\x1b[0m MongoDB connected"))
    .catch(() => console.error("\x1b[31mERROR\x1b[0m MongoDB is not connected"));
console.log(mongodb);
//Routes
const root = "./api/routes";
const mapEntityRoutes = require(root + "/mapEntities");
const templateEntityRoutes = require(root + "/templateEntities");
const authRoute = require(root + "/auth");
const imgurRoutes = require(root + "/imgur");

app.use("/mapEntities", mapEntityRoutes);
app.use("/templateEntities", templateEntityRoutes);
app.use("/uploadImage", imgurRoutes);
app.use("/auth", authRoute);

//error routes
app.use((req, res, next) => {
    const error = new Error(
        "Method " + req.method + " for " + req.originalUrl + " not found"
    );
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        },
    });
});

//Init
app.listen(port, ()=>{
    console.log(">Server Running at http://localhost:" + port);
});