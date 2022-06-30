import React, { useState } from "react";
import PropTypes from 'prop-types';

const BlogContext = React.createContext();

// Use AppProvider at the root of your project to provided to all children
const AppProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  // const [userId, setUserId] = useState(0)
  const values = {
    isLoggedIn,
    username,
    // userId
  }

  const setters = {
    setIsLoggedIn,
    setUsername,
    // setUserId
  }

  return (
    <BlogContext.Provider value={{values, setters}}>
      {children}
    </BlogContext.Provider>
  );
};

//need this because of eslint rules
AppProvider.propTypes = {
  children: PropTypes.object
}



export { AppProvider, BlogContext };