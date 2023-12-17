import { db } from "../db.js";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = (req, res) => {
  const {login, password} = req.body;

    const q = `SELECT * FROM users WHERE email='${login}'`;

    db.query(q, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
      }

      const cliente = data[0];
      if (cliente.length === 0) {
        return res.status(400).json(({error: "Usuario e/ou senha invalidos"}))
      }

    // Comparação de senha usando bcrypt
    bcrypt.compare(password, cliente.senha, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error("Erro ao comparar senhas:", bcryptErr);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      if (bcryptResult) {
        // Senhas correspondem, proceda com a geração do token JWT
        const token = jwt.sign({ nome: cliente.nome_completo, role: 1, cpf: cliente.cpf, cliente:cliente }, 'bancodedados', { expiresIn: '2d' });
        return res.status(200).json({ ...cliente, token });
      } else {
        // Senhas não correspondem
        return res.status(400).json({ error: "Usuário e/ou senha inválidos" });
      }
    });
    });

};
