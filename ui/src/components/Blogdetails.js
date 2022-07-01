import React , { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import config from '../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import { useParams, useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { BlogContext } from '../BlogContext';
import { Button } from '@mui/material'


const Blogdetails = () => {

  let [Blogdetails, setBlogdetails] = useState({
    author: '',
    title: '',
    created_at: '',
    content: '',
  });
  let [editView, setEditView] = useState(false);
  let [formChanged, setFormChanged] = useState(false);
  let [titleFeedback, setTitleFeedback] = useState('');
  let [contentFeedback, setContentFeedback] = useState('');
  let [failedFeedback, setFailedFeedback] = useState('');
  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  let {values} = useContext(BlogContext);
  let { id } = useParams();
  let nav = useNavigate();

  useEffect(() => {
    fetch(ApiUrl + `/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setBlogdetails(data[0])
        setTitle(data[0].title)
        setContent(data[0].content)
      })
      .catch(err => console.log(err))
  }, [editView]);

  const deletePost = () => {
    fetch(`${ApiUrl}/posts/${id}`, {method: 'DELETE'})
      .then((res) => {
        if(res.status === 200) {
          nav('/');
        } else {
          window.alert('an error has occurred');
        }
      })
  }

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
     }

     let res = await fetch(`${ApiUrl}/posts/${id}`, {
       method: 'PATCH',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(body)
     })

     if(res.status === 200) {
       // console.log('success!', await res.text())
       setEditView(false);
     } else if(res.status === 404){
       setFailedFeedback('post invalid')
     } else {
       setFailedFeedback('error on submission')
     }
   }
 }
  const options = (
    <OptionsContainer>
      <EditButton onClick={() => {
        if(editView && formChanged ) {
          if(confirm('Are you sure you want to continue out of edit mode?')) {
            setEditView(false);
          }
        } else {
          setEditView(!editView);
          setFormChanged(false);
        }

      }
      }/>
      <TrashButton onClick={deletePost}/>
    </OptionsContainer>
   );

   const staticBody = (
    <>
      <BlogHeader>
        <p>Author: {Blogdetails.author}</p>
        <BlogTitle>Title: {Blogdetails.title}</BlogTitle>
        <p>Date Created: {Blogdetails.created_at}</p>
      </BlogHeader>
      <BlogBody>
        Content:
        <p>{Blogdetails.content}</p>
      </BlogBody>
    </>
   )


   const editBody = (
      <>
        <h1>Edit Blog Post</h1>
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
                name="text"
                value={title}
                onChange={e => {setTitle(e.target.value); setFormChanged(true)}}
              />
              <label htmlFor="content">
                  <Labels>Content:</Labels>
              </label>
              <StyledTextarea
                name="text"
                id="content"
                rows="14"
                cols="10"
                wrap="soft"
                maxLength="1000"
                value={content}
                onChange={e => {setContent(e.target.value); setFormChanged(true)}}
              />
              {/* <p>Your post will have a timestamp of: </p>
              <p>{created_at.toString()}</p> */}
              <StyledButton variant="contained" onClick={handleSubmit}> Submit </StyledButton>
            </FormContainer>
              <p>Note: Editing this post will not change the timestamp</p>
          </form>
          <Feedback>{failedFeedback}</Feedback>
      </>
   )

  return (
    <Background>
      <DetailsContainer>
        {(values.isLoggedIn && (Blogdetails.author === values.username)) ? options : null}

        {editView ? editBody : staticBody }

      </DetailsContainer>
    </Background>
  )
}

export default Blogdetails;

const EditButton = styled(MdEdit)`
  &&{
    color: white;
    margin: 0px 20vw auto auto;
    position: absolute;
    right: 0px;
  }
  &&:hover{
    cursor: pointer;
    color: #00121c;
  }
`

const TrashButton = styled(HiTrash)`
  &&{
    color: white;
    margin: 0px 25vw auto auto;
    position: absolute;
    right: 0px;
  }
  &&:hover{
    cursor: pointer;
    color: #00121c;
  }
`

const OptionsContainer = styled.div`
  display: grid;
  margin: 20px;
`

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

const StyledButton = styled(Button)`
  &&{
    background-color: #3A87CF;
    margin-top: 20px;
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


const Labels = styled.p`
  padding-top: 15px;
  text-align: left;
`