import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Store from './pages/Store';
import Product from './pages/Product';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tienda" element={<Store />} />
        <Route path="producto/:id" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
