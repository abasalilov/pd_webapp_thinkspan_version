/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component, Suspense, lazy } from "react";
import { Switch, HashRouter, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setupReactRouter } from "@mobiscroll/react";
import { NavBar } from './components'
import { resizeAction } from "./actions";

setupReactRouter(Route, withRouter);

const LandingPage = lazy(() => import('./pages/LandingPage/index'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/index'));
const LoginRegisterPage = lazy(() => import('./pages/LoginRegisterPage/index'));
const ResultsPage = lazy(() => import('./pages/ResultsPage/index'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/index'));
const CartPage = lazy(() => import('./pages/CartPage/index'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage/index'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage/index'));
const TestPage = lazy(() => import('./pages/TestPage/index'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFooterBtnOpen: false
      // response: false,
      // endpoint: "http://127.0.0.1:3001/user/history"
    };
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.handleWindowSizeChange();
  }


  async componentDidUpdate(prevProps) {
    // const { auth } = prevProps;
    // const { isLoggedIn } = auth;
    // console.log("!isLoggedIn", !isLoggedIn);
    // console.log("this.props.auth.isLoggedIn", this.props.auth.isLoggedIn);
    // if (!isLoggedIn && this.props.auth.isLoggedIn) {
    //   // console.log("this.props", this.props);
    //   const { endpoint } = this.state;
    //   const coded = endpoint + this.props.auth.token;
    //   console.log("coded", coded);
    //   const socket = await socketIOClient(coded);
    //   console.log("socket", socket);
    //   socket.on("UpdateHx", data => {
    //     // console.log("data", data)
    //     this.setState({ response: data });
    //   });
    // }
  }

  async componentWillUnmount() {
    document.removeEventListener("keydown", this.handleClick);
  }

  handleClick = () => {
    const { displayFooterBtnOpen } = this.state;
    this.setState({ displayFooterBtnOpen: !displayFooterBtnOpen });
  };

  handleWindowSizeChange = () => {
    const { resize } = this.props;
    resize(window);
  };



  render() {
    // eslint-disable-next-line react/prop-types
    return (
      <React.Fragment>
        <NavBar {...this.props} />

        <HashRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route
                path="/"
                exact
                render={props => <LandingPage {...props}  />}
              />
              <Route
                path="/login"
                render={props => <LoginRegisterPage {...props}  />}
              />
              <Route
                path="/registration"
                render={props => <RegistrationPage {...props} />}
              />
              <Route
                path="/results"
                render={props => <ResultsPage {...props} />}
              />
              <Route
                path="/profile"
                render={props => <ProfilePage {...props} />}
              />
              <Route
                path="/cart"
                render={props => <CartPage {...props} />}
              />
              <Route
                path="/checkout"
                render={props => <CheckoutPage {...props} />}
              />
              <Route
                path="/thank-you"
                render={props => <ThankYouPage {...props} />}
              />
              <Route
                path="/test"
                render={props => <TestPage {...props} />}
              />
            </Switch>
          </Suspense>
        </HashRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});


const mapDispatchToProps = dispatch => ({
  resize: w => {
    dispatch(resizeAction(w));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
