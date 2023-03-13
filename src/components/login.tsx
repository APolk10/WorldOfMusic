import * as React from 'react';
import { useState } from 'react';

interface loginProps {
  checkUserCredentials(username: string, int: number):void,
  flag: boolean;
}

const Login: React.FC<loginProps> = ({ checkUserCredentials, flag }) => {
  const[username, setUsername] = useState('');
  const[pin, setPin] = useState('');

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>):void  => {
    setUsername(e.target.value);
  }

  const handlePinInput = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setPin(e.target.value)
  }

  const handleSubmit = () => {
    checkUserCredentials(username, parseInt(pin));
  }

  return (
    <div className='login'>
      <div>
        <p>Please enter your username and pin number.</p>
        <p>If this is your first time, please provide a unique username and memorable pin number.</p>
      </div>
      <div>
        <input type='input' onChange={handleUsernameInput} placeholder={'USERNAME'}></input>
        { flag ? <p className='loginError'>This username is taken</p> : <></>}
        <input type='input' onChange={handlePinInput} placeholder={'PIN'}></input>
        <button type='button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Login;