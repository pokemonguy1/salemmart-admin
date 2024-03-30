import './App.css';
import MySideNav from './components/MySideNav';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreateProduct from './pages/CreateProduct';
import AllProducts from './pages/AllProducts';

function App() {
  return (
    <Router>
      <MySideNav/>
      <Routes>
        <Route path='/create_product' element={<CreateProduct/>}/>
        <Route path='/all_products' element={<AllProducts/>}/>
      </Routes>
    </Router>
  );
}

export default App;
