import {useState} from 'react';
import axios from 'axios';

function Register (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  axios.defaults.withCredentials = true;

  function handleFormSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:5000/register', {username, password})
    .then((result) => {console.log(result)})
    .catch((error) => {console.log(error)});
  }

  return (
    <>

      <h1>Welcome to the Register component</h1>
      <form onSubmit={handleFormSubmit}>
        <input onChange={(e) => {setUsername(e.target.value)}} value={username} placeholder='username'>
          
        </input>
        <input onChange={(e) => {setPassword(e.target.value)}} value={password} placeholder='password'>
        
        </input>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Register;