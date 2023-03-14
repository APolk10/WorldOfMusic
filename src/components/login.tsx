import * as React from 'react';
import { useState } from 'react';

interface loginProps {
  checkUserCredentials(username: string, int: number):void,
  flag: boolean;
}

const Login: React.FC<loginProps> = ({ checkUserCredentials, flag }) => {
  const[username, setUsername] = useState('');
  const[newUser, setNewUser] = useState(0);
  const[pin, setPin] = useState('');

  const handleNewUserClick = () => {
    setNewUser(1);
  }
  const handleExistingUserClick = () => {
    setNewUser(2);
  }

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>):void  => {
    setUsername(e.target.value);
  }

  const handlePinInput = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setPin(e.target.value)
  }

  const handleSubmit = () => {
    checkUserCredentials(username, parseInt(pin));
  }

  const renderLogin = () => {
      if (newUser === 0) {
        return <></>
      }

      if (newUser === 1) {
        return (
          <div>
            <p>Please enter your username and pin number.</p>
            <input type='input' onChange={handleUsernameInput} placeholder={'USERNAME'}></input>
            { flag ? <p className='loginError'>This username is taken</p> : <></>}
            <input type='input' onChange={handlePinInput} placeholder={'PIN'}></input>
            <button type='button' onClick={handleSubmit}>Submit</button>
          </div>
        )
      }
      if (newUser === 2) {
        return (
          <div>
            <p>If this is your first time, please provide a unique username and memorable pin number.</p>
            <input type='input' onChange={handleUsernameInput} placeholder={'USERNAME'}></input>
            { flag ? <p className='loginError'>This username is taken</p> : <></>}
            <input type='input' onChange={handlePinInput} placeholder={'PIN'}></input>
            <button type='button' onClick={handleSubmit}>Submit</button>
          </div>
        )
      }
  }

  return (
    <div className='login'>
      <button type='button' onClick={handleNewUserClick}>New User</button>
      <button type='button' onClick={handleExistingUserClick}>Existing User</button>
      <>
        {renderLogin()}
      </>
    </div>
  )
}

export default Login;