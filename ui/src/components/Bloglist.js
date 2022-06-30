import React , { useEffect, useState} from 'react'
import styled from 'styled-components'
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import Blogcard from './Blogcard'

const Bloglist = () => {

  let [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetch(ApiUrl + "/posts")
      .then(response => response.json())
      .then(data => setBlogList(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <Background>
      <GridContainer>
        <h1>All Posts</h1>
        {blogList.map(blog => <Blogcard key={blog.id} blog={blog}/>)}
      </GridContainer>
    </Background>
  )
}

export default Bloglist;

const Background = styled.div`
  background-color: #00121C;
  height: 90vh;
  width: 75vw;
  justify-content: center;
  text-align: center;
  margin: 0px auto 0px auto;
  a{
    text-decoration: none;
    color: white;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, auto);
  justify-content: center;
`