// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './Components/ProductList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
