import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
//components
import Navbar from './components/navbar/Navbar';
import SearchPage from './pages/search/SearchPage';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <SearchPage />
      </div>
    );
  }
}

export default App;
