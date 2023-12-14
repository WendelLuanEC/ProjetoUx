import express from "express";
import { login } from "../controllers/login.js";

const loginRoutes = express.Router();

loginRoutes.post("/login", login);

export default loginRoutes;
