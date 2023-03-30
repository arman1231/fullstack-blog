import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { getMe, login, register } from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import { postCreateValidation } from "./validations/post.js";

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
  res.send("https://github.com/arman1231/fullstack-blog");
});

app.post("/auth/login", loginValidation, login);
app.post("/auth/register", registerValidation, register);
app.get("/auth/me", checkAuth, getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);


app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server listening ${PORT}`);
});
