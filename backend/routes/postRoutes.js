import express from "express";

import { postUser } from "../controllers/user.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/user", postUser);

export default router;
