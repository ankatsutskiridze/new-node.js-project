import express from "express";
const usertRouter = express.Router();
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

usertRouter.get("/", getUsers);
usertRouter.post("/", createUser);
usertRouter.put("/:id", updateUser);
usertRouter.delete("/:id", deleteUser);

export default usertRouter;
