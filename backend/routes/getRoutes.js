import express from "express";
import { getUsers, getUser } from "../controllers/user.js";
import checkToken  from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/user/:cpf", checkToken, getUser);
router.get("/users", checkToken, getUsers);

export default router;
