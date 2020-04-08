import React from 'react';
import '../scss/App.scss';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from './Home/Home';
import Categories from './Categories/Categories';
import About from './About/About';
import Single from './Single';

function App() {
  return (
    <HashRouter>
        <header id="header" className="header">
          <nav className="nav">
            <div className="wrapper">
              <div className="nav__logo">
                <NavLink exact to="/">Main Logo</NavLink>
              </div>
              <ul className="nav__list">
                <li><NavLink exact to="/" className="nav__item">Home</NavLink></li>
                <li><NavLink to="/categories" className="nav__item">Categories</NavLink></li>
                <li><NavLink to="/about" className="nav__item">About Us</NavLink></li>
              </ul>
            </div>
          </nav>
        </header>
        <main className="main">
          <Route exact path="/" component={Home}/>
          <Route path="/categories" component={Categories}/>
          <Route path="/about" component={About}/>
          <Route path="/post/:id" component={Single}/>
        </main>
    </HashRouter>
  );
}

export default App;