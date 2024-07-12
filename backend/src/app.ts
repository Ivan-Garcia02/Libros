import express from "express";
import cors from "cors";
import "./db/mongoose.js";
import { defaultRouter } from "./routers/default.routes.js";
import { bookRouter } from "./routers/book.routes.js";

export const app = express();
app.use(express.json());
app.use(cors());
app.use(bookRouter);
app.use(defaultRouter);