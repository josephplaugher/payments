import {} from "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
const app = express();
import cookieParser from "cookie-parser";
import Auth from "./util/Auth";
import userCont from "./controllers/userCont.mjs";
import achCont from "./controllers/achCont";
import ccCont from "./controllers/ccCont";

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

let port = process.env.PORT;
app.listen(port, function() {
  console.log(
    "server started in " + process.env.NODE_ENV + " mode on port " + port
  );
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "Appreciate Corporation");
  next();
});

app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(bodyParser.json()); // Parse application/json

app.get("/checkLoginState", Auth, (req, res) => {
  res.status(200).json({ checkLoginState: "done" });
});

app.use("/", userCont);
app.use("/", Auth, achCont);
app.use("/", ccCont);

//this route renders the UI. The UI will check for the cookie and token
//and log the user out if they don't exist.
app.all("/*", (req, res) => {
  res.render("index");
});
