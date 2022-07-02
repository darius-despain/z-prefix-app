import React from 'react';
import Header from './components/Header'
import Bloglist from './components/Bloglist'
import Blogdetails from './components/Blogdetails'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import CreateBlog from './components/CreateBlog'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {

  return (
      <Background>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Bloglist />} />
            <Route path='/posts/all' element={<Bloglist />} />
            <Route path='/posts/new' element={<CreateBlog />} />
            <Route path='/posts/:id' element={<Blogdetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </Router>
      </Background>
  );
}

export default App;


const Background = styled.div`
  background-color: #002439;
  min-height:100vh;
  width: 100vw;
  color: white;
  font-family: Arial;
  background-position: center;
  background-size: cover;
`