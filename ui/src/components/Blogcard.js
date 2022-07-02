import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

// import config from '../config'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const Blogcard = ({blog}) => {

  return (
    <Link to={`/posts/${blog.id}`}>
      <Background>
        <BlogHeader>
          <p style={{"text-align":"left"}}>{blog.author}</p>
          <BlogTitle>{blog.title}</BlogTitle>
          <p style={{"text-align":"right"}}>{blog.created_at.slice(0, 10)}</p>
        </BlogHeader>
        <BlogBody>
          <p>{blog.content.slice(0,100)}{blog.content.length > 100 ? "..." : null}</p>
        </BlogBody>
      </Background>
    </Link>
  )
}

//need this because of eslint rules
Blogcard.propTypes = {
  blog: PropTypes.object
}

export default Blogcard;

const Background = styled.div`
  background-color: #2B659B;
  width: 70vw;
  justify-content: center;
  margin: 20px 0px 20px 0px;
  text-align: center;
  display: grid;
  grid-template-areas:
    "A A A A   A A A A   A A A A"
    "B B B B   B B B B   B B B B"
    "B B B B   B B B B   B B B B";
  :hover {
    transform: scale(1.05);
  }
`

const BlogTitle = styled.div`
  font-size: 24px;
  margin: auto;
`

const BlogHeader = styled.div`
  grid-area: A;
  display: grid;
  grid-template-columns: 150px auto 150px;
  padding-top: 10px;
  height: 50px;
  margin: auto 5px auto 5px;
  width: 65vw;
`

const BlogBody = styled.div`
  grid-area: B;
  padding-left: 10px;
  padding-right: 10px;
`