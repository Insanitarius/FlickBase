import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function PreventAuthRoute(props) {
  const users = useSelector((state) => state.users);
  return <>{users.auth ? <Redirect to="/dashboard" /> : props.children}</>;
}

export default PreventAuthRoute;
