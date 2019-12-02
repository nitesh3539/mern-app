import React, {PureComponent} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import AppNavBar from './components/AppNavBar'
import ShoppingList from './components/ShoppingList'


const  App  = () => {
  return (
    <div>
      <AppNavBar/>
      <ShoppingList/>
    </div>
  );
}

export default App;
