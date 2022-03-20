import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './pages/About';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Posts from './pages/Blog/Posts';
import SinglePost from './pages/Blog/SinglePost';
import WritePost from './pages/Blog/WritePost';




function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/about" exact element={<About/>} />
          <Route path="/articles" exact element={<Articles/>} />
          <Route path="/contact" exact element={<Contact/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/posts" exact element={<Posts/>} />
          <Route path="/singlepost" exact element={<SinglePost/>} />
          <Route path="/writepost" exact element={<WritePost/>} />


          
        </Routes>
       
        <Footer/>
       
      </Router>
    </div>
  );
}

export default App;
