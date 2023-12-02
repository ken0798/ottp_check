import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./login";
import AuthProtect from "./component/authProtect";
import Header from "./Header";
import Details from "./details";
import WatchHistory from "./History";
import Home from "./Home";

export default function  RouterLayer(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/auth" Component={Login} />
          <Route Component={AuthProtect}>   
           <Route path="/" Component={Home} />  
           <Route path="/history" Component={WatchHistory} />  
           <Route path="/details/:id" Component={Details} />  
        </Route>
      </Routes>
    </BrowserRouter>
  )
}