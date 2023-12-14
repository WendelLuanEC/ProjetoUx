import { db } from "../db.js";
import  jwt  from "jsonwebtoken";

export const login = (req, res) => { 
  const {login, password} = req.body;

    const q = `SELECT * FROM clientes WHERE email='${login}' and senha='${password}'`;

    db.query(q, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const cliente = data[0];

      if (cliente.length === 0) {
        return res.status(400).json(({error: "Usuario e/ou senha invalidos"}))
      }
      
      const token = jwt.sign({matricula:cliente.matricula, role: 2, cargo: cliente.cargo}, 'bancodedados', {expiresIn:'2d'})
      return res.status(200).json({...cliente, token});
    });

};
