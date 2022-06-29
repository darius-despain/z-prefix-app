import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

// import config from '../config'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const Blogcard = ({blog}) => {

  return (
    <Background>
      <BlogHeader>
        <p>{blog.author}</p>
        <BlogTitle>{blog.title}</BlogTitle>
        <p>{blog.created_at}</p>
      </BlogHeader>
      <BlogBody>
        <p>{blog.content.slice(0,100)}...</p>
      </BlogBody>
    </Background>
  )
}

//need this because of eslint rules
Blogcard.propTypes = {
  blog: PropTypes.object
}

export default Blogcard;

const Background = styled.div`
  background-color: #2B659B;
  width: 75vw;
  justify-content: center;
  margin: 20px 0px 20px 0px;
  text-align: center;
  display: grid;
  grid-template-areas:
    "A A A A   A A A A   A A A A"
    "B B B B   B B B B   B B B B"
    "B B B B   B B B B   B B B B";
`

const BlogTitle = styled.div`
  font-size: 24px;
`

const BlogHeader = styled.div`
  grid-area: A;
  display: grid;
  grid-template-columns: 100px auto 150px;
  padding-top: 10px;
  height: 50px;
`

const BlogBody = styled.div`
  grid-area: B;
  padding-left: 10px;
  padding-right: 10px;
`