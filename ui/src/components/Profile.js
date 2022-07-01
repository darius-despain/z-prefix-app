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
  const { values, setters } = useContext(BlogContext);

  const [editView, setEditView] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [firstNameFeedback, setFirstNameFeedback] = useState('');
  const [lastNameFeedback, setLastNameFeedback] = useState('');
  const [usernameFeedback, setUsernameFeedback] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');

  const [failedFeedback, setFailedFeedback] = useState('');

  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputUsername, setInputUsername] = useState(values.username);
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');
  const [userId, setUserId] = useState(0);
  const [profileDetails, setProfileDetails] = useState({
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
  })

  const nav = useNavigate();

  useEffect(() => {
    setters.setIsLoading(true);
    if(values.isLoggedIn === true){
      fetch(ApiUrl + `/users/${values.username}`)
        .then(response => response.json())
        .then(data => {
          setProfileDetails(data[0])
          setInputFirstName(data[0].first_name)
          setInputLastName(data[0].last_name)
          setUserId(data[0].id)
          setters.setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [editView]);

  const deleteProfile = () => {
    if(confirm('Are you sure you want to delete your profile? This cannot be undone')) {
      fetch(`${ApiUrl}/users/${userId}`, {method: 'DELETE'})
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
   setFirstNameFeedback('');
   setLastNameFeedback('');
   setUsernameFeedback('');
   setFailedFeedback('');

   if(inputFirstName.length < 2) {
    setFirstNameFeedback('error: first name must be at least 2 characters\n')
    error = true;
  }
  if(inputLastName.length < 2) {
    setLastNameFeedback('error: last name must be at least 2 characters\n')
    error = true;
  }
  if(inputUsername.length < 3) {
    setUsernameFeedback('error: inputUsername must be at least 3 characters\n')
    error = true;
  }
  if(inputPassword.length < 3 && inputPassword.length > 0 ) {
    setPasswordFeedback('error: password must be at least 3 characters\n')
    error = true;
  }
  if(inputFirstName.length > 50) {
    setFirstNameFeedback('error: first name must be less than 50 characters\n')
    error = true;
  }
  if(inputLastName.length > 50) {
    setLastNameFeedback('error: first name must be less than 50 characters\n')
    error = true;
  }
  if(inputUsername.length > 50) {
    setUsernameFeedback('error: first name must be less than 50 characters\n')
    error = true;
  }
  if(inputPassword.length > 50) {
    setPasswordFeedback('error: first name must be less than 50 characters\n')
    error = true;
  }
  if(inputPassword !== inputPassword2) {
    setPasswordFeedback('error: passwords must match!\n')
    error = true;
  }
    if(!error) {
      let body = {};
      if(inputPassword.length > 3){
        body.password = inputPassword;
      }
      if(inputUsername !== profileDetails.username){
        body.username = inputUsername;
      }
      if(inputFirstName !== profileDetails.first_name ){
        body.first_name = inputFirstName
      }
      if(inputLastName !== profileDetails.last_name ){
        body.last_name = inputFirstName
      }
      console.log(`body: `, body)

      let res = await fetch(`${ApiUrl}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })

      if(res.status === 200) {
        // if the username was changed, store that in context for their session
        if(inputUsername !== profileDetails.username){
          setters.setUsername(inputUsername)
        }
        setEditView(false);
      } else if(res.status === 404){
        setFailedFeedback('new username was invalid')
      } else {
        setFailedFeedback('error on submission')
      }
    }
 }
  const handleLogout = () => {
    setters.setUsername('');
    setters.setIsLoggedIn(false);
    nav('/')
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
          <p>username: {values.username}</p>
          <p>First Name: {inputFirstName}</p>
          <p>Last Name: {inputLastName}</p>
          <StyledButton variant="contained" onClick={handleLogout}>Logout</StyledButton>
        </ProfileBody>
      </>
    )
   )


   const editBody = (
      <>
        <h1>Edit Profile</h1>
        <form action='/' method='get'>
            <FormContainer>
              <Feedback>{firstNameFeedback}</Feedback>
              <Feedback>{lastNameFeedback}</Feedback>
              <Feedback>{usernameFeedback}</Feedback>
              <Feedback>{passwordFeedback}</Feedback>
              <label htmlFor="username">
                  <Labels>username:</Labels>
              </label>
              <StyledInput
                type="text"
                name="text"
                id="username"
                value={inputUsername}
                onChange={e => {setInputUsername(e.target.value); setFormChanged(true)}}
              />
              <label htmlFor="firstName">
                  <Labels>First Name:</Labels>
              </label>
              <StyledInput
                type="text"
                id="firstName"
                name="text"
                value={inputFirstName}
                onChange={e => {setInputFirstName(e.target.value); setFormChanged(true)}}
              />
              <label htmlFor="lastName">
                  <Labels>Last Name:</Labels>
              </label>
              <StyledInput
                type="text"
                name="text"
                id="lastName"
                value={inputLastName}
                onChange={e => {setInputLastName(e.target.value); setFormChanged(true)}}
              />
              <label htmlFor="password1">
                <Labels>Password:</Labels>
              </label>
              <StyledInput
                type="password"
                id="password1"
                placeholder="enter your password here"
                name="text"
                value={inputPassword}
                onChange={e => {setInputPassword(e.target.value)}}
              />
              <label htmlFor="password2">
                  <Labels>Re-Enter your Password:</Labels>
              </label>
              <StyledInput
                type="password"
                id="password2"
                placeholder="re-enter your password here"
                name="text"
                value={inputPassword2}
                onChange={e => {setInputPassword2(e.target.value)}}
              />
              <StyledButton variant="contained" onClick={handleSubmit}> Submit </StyledButton>
            </FormContainer>
          </form>
          <p>If password is left blank it will remain the same</p>
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
  justify-inputLastName: center;
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
    margin: 0px auto 0px auto;
    color: white;
    border-color: white;
    border-width: 2px;
    border-radius: 10px;
    width: 300px;
  }
`

const FormContainer = styled.div`
  display: grid;
  grid-template-rows: 10px 10px 10px 10px 40px 30px 40px 30px 40px 30px 40px 30px 40px 30px;
  justify-inputLastName: center;
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
  margin: 0px auto 0px auto;
  width: 300px;
`