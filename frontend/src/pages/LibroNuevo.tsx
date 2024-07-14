import { useState } from 'react';
import './Libros.css'; 
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import libroService from '../services/LibroService';

export enum Gender {
  ManualYGuias = 'Manual y guías',
  AccionYAventuras = 'Acción y aventuras',
  Aprendizaje = 'Aprendizaje',
  Arte = 'Arte',
  Atlas = 'Atlas',
  Autoayuda = 'Autoayuda',
  Bibliografico = 'Bibliográfico',
  Bricolaje = 'Bricolaje',
  Canciones = 'Canciones',
  CienciaFiccion = 'Ciencia ficción',
  ClasicoEspanol = 'Clásico Español',
  Cocina = 'Cocina',
  Comic = 'Comic',
  Religioso = 'Religioso',
  Cuento = 'Cuento',
  CursoIdioma = 'Curso idioma',
  Diccionario = 'Diccionario',
  Educativo = 'Educativo',
  Deportes = 'Deportes',
  Filosofia = 'Filosofía',
  Botanica = 'Botánica',
  Guerra = 'Guerra',
  Historia = 'Historia',
  Infantil = 'Infantil',
  Novela = 'Novela',
  Paisaje = 'Paisaje',
  Revista = 'Revista',
  Sexualidad = 'Sexualidad',
  Thriller = 'Thriller',
  Otro = 'Otro'
}

interface BookInterface {
  _id?: string;
  name: string;
  author: string;
  gender: Gender;
  year: number;
  ubication: string;
}

function LibroNuevo() {
  const navigate = useNavigate();
  const [book, setBook] = useState<BookInterface>({
    name: '',
    author: '',
    gender: Gender.Otro,
    year: new Date().getFullYear(),
    ubication: '',
  });

  const handleChange = (event: SelectChangeEvent<Gender>) => {
    const value = event.target.value as Gender;
    setBook((prevBook) => ({
      ...prevBook,
      gender: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await libroService.createBook(book);
      alert('Libro creado con éxito');
      // navigate('/');
    } catch (error) {
      console.error('Error al crear el libro: ', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='container'>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
        <h2 style={{ textAlign: 'center' }}>Nuevo Libro</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={book.name}
            onChange={(e) => setBook({ ...book, name: e.target.value })}
          />
          <TextField
            label="Autor"
            name="author"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Género</InputLabel>
            <Select
              label="Género"
              name="gender"
              value={book.gender}
              onChange={handleChange}
            >
              {Object.values(Gender).map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Año"
            name="year"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={book.year}
            onChange={(e) => setBook({ ...book, year: parseInt(e.target.value) || 0 })}
          />
          <TextField
            label="Ubicación"
            name="ubication"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={book.ubication}
            onChange={(e) => setBook({ ...book, ubication: e.target.value })}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Volver
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default LibroNuevo;
