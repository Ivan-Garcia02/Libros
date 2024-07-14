import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Layout from './components/Layout.tsx';
import Libros from './pages/Libros.tsx';
import LibroNuevo from './pages/LibroNuevo.tsx';
import LibroModificar from './pages/LibroModificar.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Libros />,
      },
      {
        path: "book/create",
        element: <LibroNuevo />,
      },
      {
        path: "book/modify/:_id",
        element: <LibroModificar />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
