import bcrypt from 'bcryptjs';
const saltRounds = 10;
const myPlaintextPassword = 'helloThere';
// const someOtherPlaintextPassword = 'not_bacon';
const myOtherPlainTextPassword = 'helloThere'
import React from 'react'

const Login = () => {
  let storedPWHash;

  const isLoggedIn = false;
  bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    storedPWHash = hash;
  })

  bcrypt.compare(myOtherPlainTextPassword, storedPWHash, (err, result) => {
    console.log(`result: `, result);
  })

  return (
    isLoggedIn === true ? <p>You are logged in!</p> : <p>Sorry, please register</p>
  )

}

export default Login;