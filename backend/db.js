import mysql from "mysql"

   export const db = mysql.createConnection({
        host: "db4free.net",
        user: "wendel_luan",
        password: "milhaoaos30",
        database: "uxs_db",
    })

// Adicionando um manipulador de eventos para o evento 'connect'
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados!');
    }
});

    // export const db = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "wendel",
    //     database: "ux_db"
    // })