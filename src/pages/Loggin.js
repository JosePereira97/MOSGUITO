import React, { useMemo, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Main = ({ loadingApp, setLoadingApp, setLoggedIn, loggedIn }) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  let [authMode, setAuthMode] = useState("signin");

  const tryLoggin = () => {
    alert("aqui entra");
    axios
      .post(
        "http://127.0.0.1:5000/Login/Check_Credentials",
        {
          email: userId,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(res.data);
        if (res.data === "Wrong Password") {
          alert("Wrong Password");
        }
        if (res.data === "No user with the correpondig User_Id") {
          alert("Wrong email");
        } else {
          setLoggedIn(true);
          console.log("entra");
          history.push("/MOSGUITO/home");
        }
      });
  };

  const registUser = () => {
    axios
      .post(
        "http://127.0.0.1:5000/Login/Save_User",
        {
          email: userId,
          password: password,
          name: userName,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "This email address is already in use.") {
          alert("Email already registed");
        } else {
          setLoggedIn(true);
          history.push("/MOSGUITO/home");
        }
      });
  };
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

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={() => changeAuthMode()}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => tryLoggin()}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={() => changeAuthMode()}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="e.g António Rodrigues"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => registUser()}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

const Loggin = ({ loadingApp, setLoadingApp, loggedIn, setLoggedIn }) => {
  return (
    <Main
      loadingApp={loadingApp}
      setLoadingApp={setLoadingApp}
      setLoggedIn={setLoggedIn}
      loggedIn={loggedIn}
    />
  );
};

export default Loggin;
