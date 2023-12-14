import express from "express";

const router = express.Router();

import { deleteUser } from "../controllers/user.js";

router.delete("/user/:cpf", deleteUser);

export default router;
