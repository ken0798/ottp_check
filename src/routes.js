import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./login";
import AuthProtect from "./component/authProtect";
import App from "./App";
import Header from "./Header";

export default function  RouterLayer(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/auth" Component={Login} />
          <Route Component={AuthProtect}>   
           <Route path="/" Component={App} />  
        </Route>
      </Routes>
    </BrowserRouter>
  )
}