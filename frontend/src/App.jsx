import React from 'react';
import ItemList from './components/ItemList';
import NavTop from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <NavTop />
      <ItemList />
    </div>
  );
}

export default App;