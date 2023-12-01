import './App.css';
import { SignInGoogle } from './services/auth';

// Initialize Firebase

function App() {

  async function login() {
    const { token } = await SignInGoogle()
    console.log(token); 
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={login}>Login</button>
      </header>
    </div>
  );
}



export default App;
