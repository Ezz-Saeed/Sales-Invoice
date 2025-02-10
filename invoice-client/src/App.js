// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './Components/ProductList';
import InvoiceDetails from './Components/InvoiceDetails'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/invoice" element={<InvoiceDetails />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
