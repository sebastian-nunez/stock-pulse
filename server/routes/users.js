import express from "express";
import UsersController from "../controllers/users.js";

const router = express.Router();

router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.createUser);

export default router;
