import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import axios from 'axios';

function App() {

  function handleButtonClick(e){
    axios.get('http://localhost:5001/button').then(result => console.log(result)).catch(error => console.log(error));
  }

  return (
    <>
      <h1 className="bg-yellow-500">Hello World from front</h1>
      <Register/>
      <Login/>
      <button onClick={handleButtonClick}>Click me for fun</button>
    </>
  )
}

export default App
