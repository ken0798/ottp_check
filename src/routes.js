import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./login";
import Layout from "./component/layout";
import AuthProtect from "./component/authProtect";
import App from "./App";

export default function  RouterLayer(){
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Layout}>
          <Route path="/auth" Component={Login} />
          <Route Component={AuthProtect}>   
          <Route path="/" Component={App} />  
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}