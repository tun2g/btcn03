const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const dbJson= require('./models/db')
const userRoute = require("./routes/user");
const movieRoute = require("./routes/movie")
const castRoute = require("./routes/cast")
const app = express();
dbJson.addDataFromJson()
app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        secret: "abcd",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.engine(
    "hbs",
    exphbs.engine({
        extname: "hbs",
        defaultLayout: "main.hbs",
        partialsDir: [path.join(__dirname, "views/partials")],
        helpers: {},
    })
);

app.set("view engine", "hbs");

app.use("/public/css", express.static("public/css"));
app.use("/public/js", express.static("public/js"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//

app.use("/user", userRoute);

app.use("/", (req, res, next) => {
    if (!req.session.uid) {
        return res.render("userlogin");
    }
    next()
});
app.use("/movie",movieRoute)

app.use("/cast",castRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send(err.message);
});

const PORT = 20617;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
