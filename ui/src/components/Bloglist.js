import React , { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import Blogcard from './Blogcard'
import {BlogContext} from '../BlogContext'
import {useLocation} from 'react-router-dom'

const Bloglist = () => {

  const { values, setters } = useContext(BlogContext);
  let [blogList, setBlogList] = useState([]);
  let [titleText, setTitleText] = useState('All Posts');
  let location = useLocation();

  useEffect(() => {
    setters.setIsLoading(true)
    if(values.isLoggedIn === true && location.pathname === '/' ) {
      setTitleText("My Posts")
      fetch(`${ApiUrl}/posts/user/${values.username}`)
      .then(response => response.json())
      .then(data => {setBlogList(data); setTimeout(() => setters.setIsLoading(false), 500)})
      .catch(err => {console.log(`err: `,err); setTimeout(() => setters.setIsLoading(false), 500)})
    } else {
      setTitleText("All Posts")
      fetch(ApiUrl + "/posts")
        .then(response => response.json())
        .then(data => {setBlogList(data); setTimeout(() => setters.setIsLoading(false), 500)})
        .catch(err => {console.log(`err: `, err); setTimeout(() => setters.setIsLoading(false), 500)})
    }
  }, [location]);

  return (
    <Background>
      <GridContainer>
        <h1>{titleText}</h1>
        {values.isLoading ? <img src="https://thumbs.gfycat.com/DemandingLegalFeline-max-1mb.gif" width="240px" alt="loading" /> : (
          blogList.length > 0 ? blogList.map(blog => <Blogcard key={blog.id} blog={blog}/>) : (<><h3>You don&apos;t have any posts! </h3> <p>Create one using the &apos;Create Post&apos; link above.</p></>)
        )}
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
  margin: auto;
`