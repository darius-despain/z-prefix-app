import React , { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import config from '../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import { useParams, /* useNavigate */ } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { BlogContext } from '../BlogContext';

const Blogdetails = () => {

  let [Blogdetails, setBlogdetails] = useState({
    author: '',
    title: '',
    created_at: '',
    content: '',
  });
  // let [editView, setEditView] = useState(false);
  let {values} = useContext(BlogContext);
  let { id } = useParams();
  // let nav = useNavigate();

  useEffect(() => {
    fetch(ApiUrl + `/posts/${id}`)
      .then(response => response.json())
      .then(data => setBlogdetails(data[0]))
      .catch(err => console.log(err))
  }, []);

  // const deletePost = () => {
  //   fetch(`${ApiUrl}/posts/${id}`, {method: 'DELETE'})
  //     .then((res) => {
  //       if(res.status === 200) {
  //         nav('/');
  //       } else {
  //         window.alert('an error has occurred');
  //       }
  //     })
  // }

  const options = (
    <OptionsContainer>
      <EditButton /* onClick={() => setEditView(!editView)} *//>
      <TrashButton /* onClick={deletePost} *//>
    </OptionsContainer>
   );

  return (
    <Background>
      <DetailsContainer>
        {(values.isLoggedIn && Blogdetails.author === values.username) ? options : null}
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