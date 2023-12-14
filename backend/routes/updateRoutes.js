import express from "express";
import { updateCliente } from "../controllers/cliente.js";

const router = express.Router();

router.put("/atualizarCliente/:cpf", updateCliente);



export default router;
