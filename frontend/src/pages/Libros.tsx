import { useEffect, useState } from 'react';
import './Libros.css'; 
import libroService from '../services/LibroService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button, Menu, MenuItem, FormControl, InputLabel, Select, Slider, SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import { Gender } from './LibroNuevo';

interface BookInterface {
  _id: string;
  name: string;
  author: string;
  gender: string;
  year: number;
  ubication: string;
}

function Libros() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<BookInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState({
    gender: '',
    yearRange: [1900, new Date().getFullYear()] as number[]
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fetchBooks = async () => {
    try {
      const response = await libroService.getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error al obtener la información de los libros: ', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    var resultado = window.confirm('¿Estás seguro de eliminar el libro?')
    if (resultado === true) {
      try {
        libroService
          .deleteBook(id)
          .then(() => {
            alert('Libro eliminado')
            setBooks(books.filter(book => book._id !== id));
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name!]: value });
  };

  const handleYearRangeChange = (_: Event, newValue: number | number[]) => {
    setFilters({ ...filters, yearRange: newValue as number[] });
  };

  const normalizeText = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  const getFilteredBooks = () => {
    return books.filter((book) => {
      const matchesSearchTerm = 
        normalizeText(book.name).includes(normalizeText(searchTerm)) ||
        normalizeText(book.author).includes(normalizeText(searchTerm));
      const matchesGender = filters.gender === '' || book.gender === filters.gender;
      const matchesYear = book.year >= filters.yearRange[0] && book.year <= filters.yearRange[1];

      return matchesSearchTerm && matchesGender && matchesYear;
    });
  };

  const filteredBooks = getFilteredBooks();

  useEffect(() => {
    getFilteredBooks();
  }, [searchTerm, filters]);

  return (
    <div className='container'>
      <div className='containerHead'>
        <div className='containerSearch'>
          <TextField
            label="Buscar por nombre o autor"
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        
          <IconButton onClick={handleMenuOpen} className="filtersIcon">
            <FilterListIcon />
          </IconButton>
          <Menu
            id="filters-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className="filtersMenu"
          >
            <MenuItem key="gender">
              <FormControl fullWidth variant="filled">
                <InputLabel id="gender-label">Género</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender-select"
                  value={filters.gender}
                  name="gender"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {Object.values(Gender).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MenuItem>
            
            <MenuItem key="yearRange">
              <FormControl fullWidth>
                <InputLabel id="yearRange-label">Rango de Años</InputLabel>
                <Slider
                  aria-labelledby="yearRange-label"
                  value={filters.yearRange}
                  onChange={handleYearRangeChange}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1900}
                  max={new Date().getFullYear()}
                  className="filtersSlider"
                  sx={{ ml: 0, color: '#545454', mb: 2, pb: 0 }}
                />
              </FormControl>
            </MenuItem>

            <MenuItem key="clearFilters">
              <Button variant="contained" className='cleanFiltersButton' onClick={() => setFilters({ gender: '', yearRange: [1900, new Date().getFullYear()] })}>
                Limpiar Filtros
              </Button>
            </MenuItem>
          </Menu>
        </div>

        <div>
          <Button
            variant="contained"
            onClick={() => navigate(`/book/create`)}
          >
            Nuevo libro
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Autor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Género</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Año</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ubicación</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
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
                  <IconButton onClick={() => navigate(`/book/modify/${book._id}`)} color="primary">
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
