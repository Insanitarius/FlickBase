import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function authGuard(ComposedComponent, roleCheck = false) {
  const AuthenticationCheck = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const users = useSelector((state) => state.users);

    useEffect(() => {
      if (!users.auth) {
        props.history.push("/");
      } else {
        if (roleCheck && users.data.role === "user") {
          props.history.push("/dashboard");
        } else {
          setIsAuth(true);
        }
      }
    }, [props, users]);

    if (!isAuth) {
      return <div className="main_loader">Loading...</div>;
    } else {
      return <ComposedComponent {...props} />;
    }
  };
  return AuthenticationCheck;
}
