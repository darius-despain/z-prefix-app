import React , { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import config from '../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { BlogContext } from '../BlogContext';
import { Button } from '@mui/material'


const Profile = () => {

  // let [profileDetails, setProfileDetails] = useState({
  //   first_name: '',
  //   last_name: '',
  //   username: '',
  // });

  let [editView, setEditView] = useState(false);
  let [formChanged, setFormChanged] = useState(false);
  let [titleFeedback, setTitleFeedback] = useState('');
  let [contentFeedback, setContentFeedback] = useState('');
  let [failedFeedback, setFailedFeedback] = useState('');
  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  let { values, setters } = useContext(BlogContext);
  let nav = useNavigate();

  useEffect(() => {
    setters.setIsLoading(true);
    if(values.isLoggedIn === true){
      fetch(ApiUrl + `/users/${values.username}`)
        .then(response => response.json())
        .then(data => {
          // setProfileDetails(data[0])
          setTitle(data[0].title)
          setContent(data[0].content)
          setTimeout(() => setters.setIsLoading(false), 500)
        })
        .catch(err => console.log(err))
    }
  }, [editView]);

  const deleteProfile = () => {
    if(confirm('Are you sure you want to delete your profile? This cannot be undone')) {
      fetch(`${ApiUrl}/users/${values.username}`, {method: 'DELETE'})
        .then((res) => {
          if(res.status === 200) {
            nav('/');
          } else {
            window.alert('an error has occurred');
          }
        })
    }
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

     let res = await fetch(`${ApiUrl}/users/${values.username}`, {
       method: 'PATCH',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify(body)
     })

     if(res.status === 200) {
       setEditView(false);
     } else if(res.status === 404){
       setFailedFeedback('edit invalid')
     } else {
       setFailedFeedback('error on submission')
     }
   }
 }
  const options = (
    <OptionsContainer>
      <EditButton size={'2em'} onClick={() => {
        if(editView && formChanged ) {
          if(confirm('Are you sure you want to continue out of edit mode?\nYour work will be lost')) {
            setEditView(false);
          }
        } else {
          setEditView(!editView);
          setFormChanged(false);
        }

      }
      }/>
      <TrashButton size={'2em'} onClick={deleteProfile}/>
    </OptionsContainer>
   );

   const staticBody = (
      values.isLoading ? <img src="https://thumbs.gfycat.com/DemandingLegalFeline-max-1mb.gif" width="240px" alt="loading" /> : (
      <>
        <h1>My Profile</h1>
        <ProfileBody>
          Content:
          <p>{Profile.content}</p>
        </ProfileBody>
      </>
    )
   )


   const editBody = (
      <>
        <h1>Edit Profile</h1>
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
      { values.isLoading ? <img src="https://thumbs.gfycat.com/DemandingLegalFeline-max-1mb.gif" width="240px" alt="loading" /> : (
        <>
          {options}
          { editView ? editBody : staticBody }
        </>
      )}

      </DetailsContainer>
    </Background>
  )
}

export default Profile;

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



const ProfileBody = styled.div`
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
    background-color: #7E8C9B;
    margin: 10px auto 10px auto;
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
  grid-template-rows: 15px 15px 40px 30px 40px 100px 50px 15px;
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