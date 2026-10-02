import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Store from './pages/Store';
import Product from './pages/Product';
import { ComplaintsPage, GuaranteesPage, TermsPage } from './pages/LegalPages';
import Contact from './pages/Contact';
import WebApps from './pages/WebApps';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tienda" element={<Store />} />
        <Route path="producto/:id" element={<Product />} />
        <Route path="contactanos" element={<Contact />} />
        <Route path="web-apps" element={<WebApps />} />
        <Route path="proyectos" element={<Projects />} />
        <Route path="proyectos/:slug" element={<ProjectDetail />} />
        <Route path="politicas-de-garantia" element={<GuaranteesPage />} />
        <Route path="terminos-de-servicio" element={<TermsPage />} />
        <Route path="libro-de-reclamaciones" element={<ComplaintsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
