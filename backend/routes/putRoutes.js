import express from "express";
import { updateUser } from "../controllers/user.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.put("/user/:cpf", checkToken, updateUser);

export default router;
