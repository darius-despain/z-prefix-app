import React , { useState, useContext } from 'react'
import styled from 'styled-components'
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { BlogContext } from '../BlogContext'

const CreateBlog = () => {

  // let { username } = useParams();
  let nav = useNavigate();
  let {values} = useContext(BlogContext);

  let [titleFeedback, setTitleFeedback] = useState('')
  let [contentFeedback, setContentFeedback] = useState('')
  let [failedFeedback, setFailedFeedback] = useState('')

  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');
  const created_at = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    //reset all feedback for each submit
    setTitleFeedback('');
    setContentFeedback('');
    setFailedFeedback('');

    if(title.length < 1) {
      setTitleFeedback('error: title must be at least 1 character\n')
      error = true;
    } else {
      setTitleFeedback('')
    }
    if(content.length < 1) {
      setContentFeedback('error: content must be at least 1 characters\n')
      error = true;
    } else {
      setContentFeedback('')
    }
    if(!error) {

      let body = {
        "title": title,
        "content": content,
        "created_at": created_at
      }

      let res = await fetch(`${ApiUrl}/posts/user/${values.username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if(res.status === 200) {
        // console.log('success!', await res.text())
        nav('/')
      } else if(res.status === 404){
        setFailedFeedback('post invalid')
      } else {
        setFailedFeedback('error on submission')
      }
    }
  }

  if(values.isLoggedIn) {
    return (
      <Background>
      <DetailsContainer>
        <h1>New Blog Post</h1>
        <form action='/' method='get'>
            <FormContainer>
              <Feedback>{titleFeedback}</Feedback>
              <Feedback>{contentFeedback}</Feedback>
              <label htmlFor="title">
                  <Labels>Title:</Labels>
              </label>
              <StyledInput
                type="text"
                id="title"
                placeholder="enter the title of your blog post"
                name="text"
                value={title}
                onChange={e => {setTitle(e.target.value)}}
              />
              <label htmlFor="content">
                  <Labels>Content:</Labels>
              </label>
              <StyledTextarea
                name="text"
                id="content"
                placeholder="enter the content of your blog post"
                rows="14"
                cols="10"
                wrap="soft"
                maxLength="1000"
                value={content}
                onChange={e => {setContent(e.target.value)}}
              />
              <p>Your post will have a timestamp of: </p>
              <p>{created_at.toString()}</p>
              <StyledButton variant="contained" onClick={handleSubmit}> Submit </StyledButton>
            </FormContainer>
          </form>
          <Feedback>{failedFeedback}</Feedback>
      </DetailsContainer>
    </Background>
    )
  } else {
    return (<h1>Please log in to see this page</h1>)
  }
}

export default CreateBlog;

const Background = styled.div`
  background-color: #00121C;
  height: 90vh;
  width: 75vw;
  justify-content: center;
  text-align: center;
  margin: 0px auto 0px auto;
`

// const BlogTitle = styled.div`
//   font-size: 48px;
// `

// const BlogHeader = styled.div`
//   grid-area: A;
//   display: grid;
//   grid-template-columns: 150px auto 150px;
//   padding-top: 10px;
//   height: 50px;
// `

// const BlogBody = styled.div`
//   grid-area: B;
//   padding-left: 10px;
//   padding-right: 10px;
//   padding-top: 30px;
// `

const DetailsContainer = styled.div`
  padding: 150px 10px 50px 10px;
  margin: 100px auto;
  background-color: #2B659B;
  width: 65vw;
  height: 55vh;

`

const StyledButton = styled(Button)`
  &&{
    background-color: #7E8C9B;
    margin: 30px auto 10px auto;
    width: 150px;
  }
  &&:hover {
    background-color: #002439;
  }
`
const StyledInput = styled.input`
  &&{
    background-color: #002439;
    color: white;
    border-color: white;
    border-width: 2px;
    border-radius: 10px;
  }
`
const StyledTextarea = styled.textarea`
&&{
  background-color: #002439;
  color: white;
  border-color: white;
  border-width: 2px;
  border-radius: 10px;
  font-family: Arial;
  width: 50vw;
}

`

const FormContainer = styled.div`
  display: grid;
  grid-template-rows: 15px 15px 40px 30px 40px 100px 15px 15px;
  justify-content: center;
  width: 50vw;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
`

const Feedback = styled.p`
  color: red;
`
// const Success = styled.p`
//   color: green;
// `

const Labels = styled.p`
  padding-top: 15px;
  text-align: left;
`