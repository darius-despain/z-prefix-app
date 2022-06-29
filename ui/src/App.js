import React/* , { useEffect, useState} */ from 'react';
// import config from './config'
import Header from './components/Header'
import Bloglist from './components/Bloglist'
import styled from 'styled-components'

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
      <Header />
      <Bloglist />
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