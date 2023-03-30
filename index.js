import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { getMe, login, register } from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import * as UserController from "./controllers/UserController.js";
import { postCreateValidation } from "./validations/post.js";
import multer from "multer";
import handleValidationErrors from "./utils/handleValidationErrors.js";

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

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("https://github.com/arman1231/fullstack-blog");
});

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/register", registerValidation, handleValidationErrors,UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) =>{
  res.json({
    url: `uploads/${req.file.originalname}`
  })
})

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
