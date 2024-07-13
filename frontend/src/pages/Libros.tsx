import { useEffect, useState } from 'react';
import './Libros.css'; 
import libroService from '../services/LibroService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface BookInterface {
  _id: string;
  name: string;
  author: string;
  gender: string;
  year: number;
  ubication: string;
}

function Libros() {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await libroService.getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('Error al obtener la información de los libros: ', error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    var resultado = window.confirm('¿Estas seguro de elimiar el libro?')
    if (resultado === true) {
      try {
        libroService
          .deleteBook(id)
          .then((response) => {
            alert('Libro eliminado')
            console.log(response)
            window.location.reload();
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleEdit = (id: string) => {
    // Implementa la lógica para editar un libro
    console.log('Editar libro con id:', id);
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <TextField
        label="Buscar por nombre o autor"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.gender}</TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell>{book.ubication}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(book._id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(book._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}

export default Libros;