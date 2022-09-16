import React, { useMemo, useState } from 'react';
import axios from 'axios'
import  { Redirect } from 'react-router-dom'

const Main = ({loadingApp, setLoadingApp, setLoggedIn, loggedIn}) => {
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')

    const tryLoggin = () => {
        //funçao para tentar fazer o loggin
    }

    const regisUser = () => {
        //funçao para registar um User
    }
    /* 
    ** Check for a user token when the app initializes.
    **
    ** Use the loadingApp variable to delay the routes from
    ** taking effect until loggedIn has been set (even logged in
    ** users would be immediately redirected to login page
    ** otherwise).
    */

    /*useEffect(() => {
        setLoggedIn(!!getUser());
        setLoadingApp(false);
    }, []);*/

    
    let [authMode, setAuthMode] = useState("signin")
    
    const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")}
    
    if (authMode === "signin") {
        return (
          <div className="Auth-form-container">
            <form className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    Sign Up
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    onChange={(e) => setUserId(e)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e)}
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary" onClick={tryLoggin}>
                    Submit
                  </button>
                </div>
                <p className="text-center mt-2">
                  Forgot <a href="#">password?</a>
                </p>
              </div>
            </form>
          </div>
        )
      }
    
      return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Full Name</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="e.g António Rodrigues"
                  onChange={(e) => setUserName(e)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                  onChange={(e) => setUserId(e)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={regisUser}>
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      )

}

const Loggin = ({loadingApp, setLoadingApp,loggedIn,setLoggedIn}) => {
    return(
        <Main 
        loadingApp = {loadingApp}
        setLoadingApp = {setLoadingApp}
        setLoggedIn = {setLoggedIn}
        loggedIn = {loggedIn}
        />
    )
}

export default Loggin
    
  