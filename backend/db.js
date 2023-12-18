import mysql from "mysql"

//  export const db = mysql.createConnection({
//       host: "db4free.net",
//       user: "wendel_luan",
//       password: "milhaoaos30",
//       database: "uxs_db",
//   })
   export const db = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "wendel",
       database: "ux_db"
   })