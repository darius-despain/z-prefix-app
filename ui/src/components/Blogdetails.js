import React , { useEffect, useState} from 'react'
import styled from 'styled-components'
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import { useParams } from 'react-router-dom'

const Blogdetails = () => {

  let [Blogdetails, setBlogdetails] = useState({
    author: '',
    title: '',
    created_at: '',
    content: '',
  });
  let { id } = useParams();

  useEffect(() => {
    fetch(ApiUrl + `/posts/${id}`)
      .then(response => response.json())
      .then(data => setBlogdetails(data[0]))
      .catch(err => console.log(err))
  }, []);

  return (
    <Background>
      <DetailsContainer>
        <BlogHeader>
          <p>Author: {Blogdetails.author}</p>
          <BlogTitle>Title: {Blogdetails.title}</BlogTitle>
          <p>Date Created: {Blogdetails.created_at}</p>
        </BlogHeader>
        <BlogBody>
          Content:
          <p>{Blogdetails.content}</p>
        </BlogBody>
      </DetailsContainer>
    </Background>
  )
}

export default Blogdetails;

const Background = styled.div`
  background-color: #00121C;
  height: 90vh;
  width: 75vw;
  justify-content: center;
  text-align: center;
  margin: 0px auto 0px auto;
`

const BlogTitle = styled.div`
  font-size: 48px;
`

const BlogHeader = styled.div`
  grid-area: A;
  display: grid;
  grid-template-columns: 150px auto 150px;
  padding-top: 10px;
  height: 50px;
`

const BlogBody = styled.div`
  grid-area: B;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 15vmin
`

const DetailsContainer = styled.div`
  padding: 150px 10px 50px 10px;
  margin: 100px auto;
  background-color: #2B659B;
  width: 65vw;
  height: 55vh;
`