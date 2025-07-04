import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Catalog from './Components/Catalog';
import Navbar from './Components/Navbar';
import ItemPage from './Components/ItemPage';
import Cart from './Components/AddItem';
import { Provider } from 'react-redux';
import cartReducer from './Components/cartSlice';
import filterReducer from './Components/filterSlice'; 
import "react-toastify/dist/ReactToastify.css";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filterReducer, 
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;