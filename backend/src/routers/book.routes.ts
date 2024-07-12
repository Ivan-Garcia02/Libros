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




/** Obtener todos los libros */
bookRouter.get("/book", async (req, res) => {
  try {
    const books = await Book.find();

    // Mandar el resultado al cliente
    if (books) {
      return res.status(200).send(books);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});


/** Obtener book por id */
bookRouter.get("/book/:id", async (req, res) => {
  try {
    const book = await Book.findOne({_id: req.params.id});

    // Mandar el resultado al cliente
    if (book) {
      res.status(200).send(book);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});




/** Actualizar un libro a través de su id */
bookRouter.patch('/book/:id', async (req, res) => {   
  try {
    // Buscar el libro
    const book = await Book.findOne({_id: req.params.id});
    if (!book) {
      return res.status(404).send({
        error: "Libro no encontrado"
      });
    }

    // Verificar opciones de actualizado permitidas
    const allowedUpdates = ['name', 'author', 'gender', 'year', 'ubication'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
    
    if (!isValidUpdate) {
      return res.status(400).send({
        error: 'Opciones no permitidas',
      });
    }

    // Actualizar el libro
    const updateBook = await Book.findByIdAndUpdate(book._id, req.body, {
      new: true,
      runValidators: true
    })

    if (updateBook) {
      return res.status(201).send(updateBook);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});




/** Eliminar un libro de la BD por id */
bookRouter.delete("/book/:id", async (req, res) => {
  try {
    // Buscar el libro
    const book = await Book.findOne({_id: req.params.id})
    if (!book) {
      return res.status(404).send("Libro no encontrado");
    }

    // Eliminar el libro
    const deletedBook = await Book.findOneAndDelete({
      _id: req.params.id,
    });

    if (deletedBook) {
      return res.status(200).send(deletedBook);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});