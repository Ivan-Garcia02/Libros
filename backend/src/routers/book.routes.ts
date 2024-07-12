import * as express from "express";
import { Book } from "../models/book.js";

export const bookRouter = express.Router();

/** Añadir un libro */
bookRouter.post("/book", async (req, res) => {
  try {
    const book = new Book(req.body);

    // Añadir usuario a la BD
    await book.save();
    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).send(error);
  }
});
