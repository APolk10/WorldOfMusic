import * as React from 'react';
import { useState } from 'react';

interface loginProps {
  checkUser(username: string, pin: number):void,
  createUser(username: string, pin: number):void,
  flag: boolean;
}

const Login: React.FC<loginProps> = ({ checkUser, createUser, flag }) => {
  const[username, setUsername] = useState('');
  const[newUser, setNewUser] = useState(0);
  const[pin, setPin] = useState('');

  const handleNewUserClick = () => {
    setNewUser(2);
  }
  const handleExistingUserClick = () => {
    setNewUser(1);
  }

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>):void  => {
    setUsername(e.target.value);
  }

  const handlePinInput = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setPin(e.target.value)
  }

  const handleCheckUserSubmit = () => {
    if (username && pin) {
      checkUser(username, parseInt(pin));
    }
  }
  const handleCreateUserSubmit = () => {
    if (username && pin) {
      createUser(username, parseInt(pin))
    }
  }

  const renderLogin = () => {
      if (newUser === 0) {
        return <></>
      }
      if (newUser === 1) {
        return (
          <div className='login'>
            <p className='loginText'>Please enter your username and pin number.</p>
            <input type='input' onChange={handleUsernameInput} placeholder={'USERNAME'}></input>
            { flag ? <p className='loginError'>This username is taken</p> : <></>}
            <input type='input' onChange={handlePinInput} placeholder={'PIN'}></input>
            <button type='button' onClick={handleCheckUserSubmit}>Submit</button>
          </div>
        )
      }
      if (newUser === 2) {
        return (
          <div className='login'>
            <p className='loginText'>If this is your first time, please provide a unique username and memorable pin number.</p>
            <input type='input' onChange={handleUsernameInput} placeholder={'USERNAME'}></input>
            { flag ? <p className='loginError'>This username is taken</p> : <></>}
            <input type='input' onChange={handlePinInput} placeholder={'PIN'}></input>
            <button type='button' onClick={handleCreateUserSubmit}>Submit</button>
          </div>
        )
      }
  }

  return (
    <div className='login'>
      <div className='userSelection'>
        <button className='userButtons'type='button' onClick={handleNewUserClick}>New User</button>
        <button className='userButtons' type='button' onClick={handleExistingUserClick}>Existing User</button>
      </div>
      <>
        {renderLogin()}
      </>
    </div>
  )
}

export default Login;