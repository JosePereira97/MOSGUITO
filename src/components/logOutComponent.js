import React from "react";
import { Button, Toolbar, Typography } from "@material-ui/core";
import axios from "axios";

const LogOut = ({ loggedIn }) => {
  const DoLogout = () => {
    axios
      .post(
        "http://127.0.0.1:5000//Login/Logout",
        { nada: "nada" },
        { withCredentials: true }
      )
      .then((res) => {
        window.location.reload(false);
      });
  };
  if (loggedIn) {
    return (
      <Button
        style={{ position: "absolute", top: "0", right: "15px" }}
        onClick={DoLogout}
        variant="contained"
        color="secondary"
      >
        Logout
      </Button>
    );
  } else {
    return <></>;
  }
};

export default LogOut;
