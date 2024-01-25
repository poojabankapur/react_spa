import React from 'react';
import './App.css';
import './i18n/i18n';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import News from './components/News/News';
import User from './components/User/User';
import Home from './components/Home';
import UserDetails from './components/User/UserDetails';

const App: React.FC = () => {

  return (
    < BrowserRouter >
      <article className="article-header">
        <header>
          <h1>React App</h1>
        </header>
        <div className="App-main-div">
          <div className="nav-link">
            <Link to="/users">
              <a>Users</a>
            </Link>
            <Link to="/news">
              <a>News</a>
            </Link>
          </div>
        </div>
      </article>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/users" element={<User />}></Route>
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/news" element={<News />}></Route>
      </Routes>
    </BrowserRouter>
  )

};

export default App;


