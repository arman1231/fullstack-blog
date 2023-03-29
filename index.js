import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { getMe, login, register } from "./controllers/UserController.js";

mongoose
  .connect("mongodb://localhost:27017/fullstack_blog")
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB ERR", err);
  });

const app = express();
const PORT = 4444;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello1");
});

app.post("/auth/login", loginValidation, login);

app.post("/auth/register", registerValidation, register);

app.get("/auth/me", checkAuth, getMe);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server listening ${PORT}`);
});
