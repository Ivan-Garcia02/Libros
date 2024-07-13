import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Outlet /> {/* Esto permite que las rutas cambien aquí */}
    </div>
  );
};

export default Layout;