import express from "express";
import { getClientes, getInfoCliente } from "../controllers/cliente.js";
import checkToken  from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/getClientes", checkToken, getClientes);

router.get("/getInfoCliente/:cpf", checkToken, getInfoCliente);

export default router;
