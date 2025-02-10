// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './Components/ProductList';
import InvoiceItemTable from './Components/InvoiceItemTable'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/invoiceItems" element={<InvoiceItemTable />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
