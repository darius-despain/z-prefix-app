import React from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HeaderDiv>
      <Link to={`/`}>
        <Logo> Blogtastic </Logo>
      </Link>
      <StyledLoginButton variant="contained"> Login/Register </StyledLoginButton>
    </HeaderDiv>
  )
}

export default Header;

const StyledLoginButton = styled(Button)`
  &&{
    background-color: #002439;
    margin: 23px 50px auto auto;
    height: 50px;
    width: 175px;
    position: absolute;
    right: 0px;
  }
  &&:hover {
    background-color: #2b659b;
  }
`

const HeaderDiv = styled.div`
  background-color: #1D4367;
  position: relative;
  top: 0px;
  height: 100px;
  width: 100%;
  line-height: 35px;

`

const Logo = styled.div`
  padding-top: 27px;
  text-align: center;
  color: white;
  width: 200px;
  justify-content: center;
  font-size: 42px;
  margin: auto;
  position: absolute;
  left: 0px;
  padding-left: 20px;
`