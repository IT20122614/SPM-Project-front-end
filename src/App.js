import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "./App.css";
import Footer from "./components/IT20122096/common/Footer";
import NavBar from "./components/IT20122096/common/NavBar";
import ResponsiveAppBar from "./components/IT20122096/common/newNav";
import Home from "./components/IT20122096/home";
import LoginForm from "./components/IT20122096/loginForm";
import profile from "./components/IT20122096/profile";
import RegisterForm from "./components/IT20122096/registerForm";
import Plannings from "./components/IT20122096/TripPlaning/Planings";
import { getCurrentUser } from "./services/IT20122096/authServices";
import { isAdmin } from "./services/IT20122096/userServices";

class App extends Component {
  state = {
    user: {},
    isAdmin: false,
  };

  async componentDidMount() {
    const user = getCurrentUser();
    localStorage.setItem("selectedNav", "Home");

    this.setState({ user });
    if (user) {
      this.setState({ isAdmin: await isAdmin() });
    }
  }

  render() {
    return (
      <React.Fragment>
       {/* <NavBar user={this.state.user} isAdmin={this.state.isAdmin} /> */}
        <ResponsiveAppBar user={this.state.user} isAdmin={this.state.isAdmin} />
        <Switch>
          <Route path={"/login"} component={LoginForm} />
          <Route path={"/register"} component={RegisterForm} />
          <Route path={"/home"} component={Home} />
          <Route path={"/plannings"} component={Plannings} />
          <Route path={"/profile"} component={profile} />
          <Redirect from="/" to={"/login"} />
        </Switch>
        <Footer/>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Zoom}
        />
      </React.Fragment>
    );
  }
}

export default App;
