import express from "express";

const router = express.Router();

import { deleteCliente } from "../controllers/cliente.js";

router.delete("/deletarCliente/:cpf", deleteCliente);

export default router;
