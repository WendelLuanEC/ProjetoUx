import { db } from "../db.js";

export const getClientes = (req, res) => {
  const query = `SELECT * FROM clientes`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(result);
  });
};

export const getInfoCliente = (req, res) => {
  const cpf = req.params.cpf;

  const query = `SELECT * FROM cliente WHERE cpf = ?`;

  db.query(query, [cpf], (err, result) => {
    console.log(err);
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json(result);
  });
};

export const addCliente = (req, res) => {
  const newClient = req.body;
  const {
    nome_completo,
    rg,
    orgao_emissor_rg,
    uf_rg,
    cpf,
    data_nascimento,
    telefone,
    email,
    tipo_de_logradouro,
    nome_logradouro,
    numero,
    bairro,
    estado,
    cep,
  } = newClient;

  const requiredFields = [
    "nome_completo",
    "rg",
    "orgao_emissor_rg",
    "uf_rg",
    "cpf",
    "data_nascimento",
    "telefone",
    "email",
    "tipo_de_logradouro",
    "nome_logradouro",
    "numero",
    "bairro",
    "estado",
    "cep",
  ];

  const missingFields = requiredFields.filter((campo) => !(campo in newClient));

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Campos faltando: ${missingFields.join(", ")}` });
  }

  const query = `
    INSERT INTO cliente (nome_completo, rg, orgao_emissor_rg, uf_rg, cpf, data_nascimento, telefone, email, tipo_de_logradouro, nome_logradouro, numero, bairro, estado, cep)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      nome_completo,
      rg,
      orgao_emissor_rg,
      uf_rg,
      cpf,
      data_nascimento,
      JSON.stringify(telefone),
      JSON.stringify(email),
      tipo_de_logradouro,
      nome_logradouro,
      numero,
      bairro,
      estado,
      cep,
    ],
    (err, result) => {
      console.log(err);
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const clienteId = result.insertId;

      return res
        .status(200)
        .json({ message: "Cliente inserido com sucesso.", clienteId });
    }
  );
};

export const updateCliente = (req, res) => {
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
    UPDATE cliente SET ${updates.join(", ")} WHERE cpf = ?
  `;

  db.query(query, values, (err, result) => {
    console.log(err)
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ message: "Cliente atualizado com sucesso." });
  });
};

export const deleteCliente = (req, res) => {
  const clientCPF = req.params.cpf;

  const query = `DELETE FROM cliente WHERE cpf = ?`;

  db.query(query, [clientCPF], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ message: "Cliente deletado com sucesso." });
  });
};
