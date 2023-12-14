import express from "express";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js";
import getRoutes from "./routes/getRoutes.js";
import updateRoutes from "./routes/updateRoutes.js";
import deleteRoutes from "./routes/deleteRoutes.js"
import loginRoutes from "./routes/loginRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRoutes);
app.use(postRoutes);
app.use(getRoutes);
app.use(updateRoutes);
app.use(deleteRoutes);


app.listen(8800);
