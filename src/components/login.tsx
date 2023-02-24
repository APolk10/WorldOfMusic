import * as React from 'react';
import { useState } from 'react';

interface loginProps {
  checkUser(username: string):void,
  flag: boolean;
}

const Login: React.FC<loginProps> = ({ checkUser, flag }) => {
  const[username, setUsername] = useState('');

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>):void  => {
    setUsername(e.target.value);
  }

  const handleSubmit = () => {
    checkUser(username);
  }

  return (
    <div className='login'>
      <div>
        <p>Please enter your username.</p>
        <p>If this is your first time, please provide a unique username for this website.</p>
      </div>
      <div>
        <input type='input' onChange={handleTextInput}></input>
        <button type='button' onClick={handleSubmit}>Submit</button>
        { flag ? <p className='loginError'>This username is taken</p> : <></>}
      </div>
    </div>
  )
}

export default Login;