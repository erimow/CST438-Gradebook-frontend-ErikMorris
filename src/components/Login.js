import React, { useState, useEffect } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function Login(){
    const [message, setMessage] = useState('');

    const login =() => {

    }


    return (
        <div>
          <h3>Login</h3>
          <div margin="auto" >
            <h4 id="gmessage" >{message}&nbsp;</h4>
            <input type="email" name="email" placeholder='Enter email'></input>
            <input type="password" name="password" placeholder='Enter password'></input><br></br>
            <button id="login" type="button" margin="auto" onClick={login}>Login</button><br></br>
          </div>
        </div>
      )
}

export default Login;