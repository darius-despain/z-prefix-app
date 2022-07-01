import React/* , { useEffect, useState} */ from 'react';
// import config from './config'
import Header from './components/Header'
import Bloglist from './components/Bloglist'
import Blogdetails from './components/Blogdetails'
// import Login from './components/Login'
// import CreateBlog from './components/CreateBlog'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const App = () => {

  // let [data, setData] = useState('');

  // useEffect(() => {
  //   fetch(ApiUrl + "/")
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(err => console.log(err))
  // }, []);


  return (
      <Background>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Bloglist />} />
            <Route path='/posts/all' element={<Bloglist />} />
            {/* <Route path='/posts/new' element={<CreateBlog />} /> */}
            <Route path='/posts/:id' element={<Blogdetails />} />
            {/* <Route path='/login' element={<Login />} /> */}
          </Routes>
        </Router>
      </Background>
  );
}

export default App;


const Background = styled.div`
  background-color: #002439;
  height: 100vh;
  width: 100vw;
  margin: 0px;
  color: white;
  font-family: Arial
`