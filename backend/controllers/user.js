import { db } from "../db.js";
import bcrypt from "bcrypt"; 

export const getUsers = (req, res) => {
  const query = `SELECT * FROM clientes`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(result);
  });
};

export const getUser = (req, res) => {
  const cpf = req.params.cpf;

  const query = `SELECT * FROM users WHERE cpf = ?`;

  db.query(query, [cpf], (err, result) => {
    console.log(err);
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(result);
  });
};

export const postUser = (req, res) => {
  const newUser = req.body;
  const {
    cpf,
    nome_completo,
    email,
    telefone,
    cep,
    estado,
    cidade,
    bairro,
    endereco,
    numero,
    complemento,
    senha,
  } = newUser;

  const requiredFields = [
    "cpf",
    "nome_completo",
    "email",
    "telefone",
    "cep",
    "estado",
    "cidade",
    "bairro",
    "endereco",
    "numero",
    "complemento",
    "senha",
  ];

  const missingFields = requiredFields.filter((campo) => !(campo in newUser));

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Campos faltando: ${missingFields.join(", ")}` });
  }

  // const hash = bcrypt.hash(newUser.senha, 10, (err, hash) => {
  //   if (err) {
  //     console.error('Erro ao criar hash:', err);
  //     // Trate o erro conforme necessário
  //   } else {
  //     // `hash` contém a senha hashada que você pode armazenar no banco de dados
  //   }
  // });

  const hash = bcrypt.hashSync(newUser.senha, 10);
  const query = `
    INSERT INTO users (cpf, nome_completo, email, telefone, cep, estado, cidade, bairro, endereco, numero, complemento, senha)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      cpf,
      nome_completo,
      email,
      telefone,
      cep,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      complemento,
      hash,
    ],
    (err, result) => {
      console.log(err);
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const userId = result.insertId;

      return res
        .status(200)
        .json({ message: "Usuário inserido com sucesso.", userId });
    }
  );
};

export const updateUser = (req, res) => {
  const clientCPF = req.params.cpf;
  const body = req.body;
  const updates = [];
  const values = [];

  for (const key in body) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      updates.push(`${key} = ?`);
      values.push(body[key]);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json("Nenhum campo fornecido para atualização.");
  }

  values.push(clientCPF);
  const query = `
    UPDATE users SET ${updates.join(", ")} WHERE cpf = ?
  `;

  db.query(query, values, (err, result) => {
    console.log(err)
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso." });
  });
};

export const deleteUser = (req, res) => {
  const userCPF = req.params.cpf;

  const query = `DELETE FROM users WHERE cpf = ?`;

  db.query(query, [userCPF], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  });
};
