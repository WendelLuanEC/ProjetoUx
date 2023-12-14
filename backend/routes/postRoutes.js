import express from "express";

import { addCliente } from "../controllers/cliente.js";


const router = express.Router();

router.post("/addCliente", addCliente);

export default router;
