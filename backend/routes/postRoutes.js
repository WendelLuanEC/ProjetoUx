import express from "express";

import { postUser } from "../controllers/user.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/user", checkToken, postUser);

export default router;
