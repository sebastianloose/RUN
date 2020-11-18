import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginScreen from "./screens/loginScreen";
import ContainerScreen from "./screens/containerScreen";
import PrivateRoute from "./components/privateRoute";

function App() {
  return (
    <Router basename={"/run"}>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/home" component={ContainerScreen} />
          <Route path="/" component={LoginScreen} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
