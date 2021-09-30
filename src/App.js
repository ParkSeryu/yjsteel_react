import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import Login from "./Route/Login";
import Home from "./Route/Home";
import Menu1 from "./Route/menu1/Menu1";
import Menu2 from "./Route/menu2/Menu2";
function App() {
  return (
    <HashRouter>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/Menu1" component={Menu1} />
      <Route path="/Menu2" component={Menu2} />
    </HashRouter>
  );
}

export default App;
