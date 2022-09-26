import React, { Component } from "react";
import "./App.css";
// import { Route, Switch } from "react-router-dom";

import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import Testing from "./components/IT20122614/Testing";
import AdminHomePage from "./components/IT20122614/AdminHomePage";
import AddNewHotel from "./components/IT20122614/AddNewHotel";
import EditHotels from "./components/IT20122614/EditHotels";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import UpdateHotel from "./components/IT20122614/UpdateHotel";
// IT20122096
import ResponsiveAppBar from "./components/IT20122096/common/newNav";
import Home from "./components/IT20122096/home";
import LoginForm from "./components/IT20122096/loginForm";
import PackageStepper from "./components/IT20122096/packeges/PackageStepper";
import Packages from "./components/IT20122096/packeges/packeges";
import profile from "./components/IT20122096/profile";
import RegisterForm from "./components/IT20122096/registerForm";
import Payment from "./components/IT20122096/TripPlaning/payment/payment";
import Plannings from "./components/IT20122096/TripPlaning/Planings";
import { getCurrentUser } from "./services/IT20122096/authServices";
import { isAdmin } from "./services/IT20122096/userServices";
import UpdatePackage from "./components/IT20122096/packeges/updatePackage";
import PackagePayment from "./components/IT20122096/packeges/payment/packagePayment";

// IT20216078
import TransportServicesRequests from "./components/IT20216078/TransportServicesRequests";
import RegisterTransportServices from "./components/IT20216078/RegisterTransportServices";
import TransportServicesRegistered from "./components/IT20216078/TransportServicesRegistered";

// IT20192082
import PlaceList from "./components/IT20192082/PlaceList";
import PlaceDetails from "./components/IT20192082/PlaceDetails";
import Places from "./components/IT20192082/Places";
import PlaceEdit from "./components/IT20192082/PlaceEdit";
import PlaceCreate from "./components/IT20192082/PlaceCreate";
import Create from "./components/IT20192082/Create";
import ApproveList from "./components/IT20192082/ApproveList";
import Report from "./components/IT20192082/Report";

class App extends Component {
  state = {
    user: {},
    isAdmin: false,
  };

  async componentDidMount() {
    const user = getCurrentUser();
    localStorage.setItem("selectedNav", "Home");
    sessionStorage.setItem("email", user.sub);

    this.setState({ user });
    if (user) {
      this.setState({ isAdmin: await isAdmin() });
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <NavBar /> */}
        <ResponsiveAppBar user={this.state.user} isAdmin={this.state.isAdmin} />
        <Switch>
          <Route path="/student-profile" exact component={Testing} />
          <Route path="/admin-home" exact component={AdminHomePage} />
          <Route path="/add-hotel" exact component={AddNewHotel} />
          <Route path="/edit-hotel" exact component={EditHotels} />
          <Route path="/update-hotel/:id" exact component={UpdateHotel} />
          {/* IT20122096 */}
          <Route path={"/login"} component={LoginForm} />
          <Route path={"/register"} component={RegisterForm} />
          <Route path={"/home"} component={Home} />
          <Route path={"/plannings"} component={Plannings} />
          <Route path={"/packages"} component={Packages} />
          <Route
            path={"/package/update/:id"}
            render={(props) => <UpdatePackage {...props} />}
          />
          <Route path={"/profile"} component={profile} />
          <Route
            path={"/payment/package/:id"}
            render={(props) => <PackagePayment {...props} />}
          />
          <Route
            path={"/payment/:id"}
            render={(props) => <Payment {...props} />}
          />
          {/* <Redirect from="/" to={"/login"} /> */}

          {/* IT20216078 */}
          <Route
            exact
            path="/transport-service"
            component={RegisterTransportServices}
          />
          <Route
            exact
            path="/requested"
            component={TransportServicesRequests}
          />
          <Route
            exact
            path="/registered"
            component={TransportServicesRegistered}
          />
          {/* IT20192082 */}
          <Route exact path="/place" component={PlaceList} />
          <Route path="/place/:id" exact component={PlaceDetails} />
          <Route path="/user/save" exact component={Create} />
          <Route path="/user/report" exact component={Report} />
          <Route path="/adminPlace" exact component={Places} />
          <Route path="/edit/:id" exact component={PlaceEdit} />
          <Route path="/save" exact component={PlaceCreate} />
          <Route path="/user/place" exact component={ApproveList} />
        </Switch>
        <Footer />
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
