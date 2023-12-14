import express from "express";
import { updateUser } from "../controllers/user.js";

const router = express.Router();

router.put("/user/:cpf", updateUser);

export default router;
