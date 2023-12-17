import mysql from "mysql"

export const db = mysql.createConnection({
    host: "db4free.net",
    user: "wendel_luan",
    password: "milhaoaos30",
    database: "uxs_db"
})