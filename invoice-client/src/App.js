// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import ProductList from './Components/ProductList';
import InvoiceDetails from './Components/InvoiceDetails'
import Payment from './Components/Payment'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<ProductList />} />
        <Route path="/invoice" element={<InvoiceDetails />} />
        <Route path="/checkout" element={<Payment />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
