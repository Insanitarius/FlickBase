import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import SideDrawer from "./sideNavigation";

import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../../store/actions/index";
import { showToast } from "../../utils/tools";
import { signOut } from "../../store/actions/users_actions";

const Header = (props) => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(signOut());
    props.history.push("/");
  };

  useEffect(() => {
    if (notification && notification.error) {
      const msg = notification.msg ? notification.msg : "Something went wrong";
      showToast("ERROR", msg);
      dispatch(clearNotification());
    }

    if (notification && notification.success) {
      const msg = notification.msg ? notification.msg : "Awesome";
      showToast("SUCCESS", msg);
      dispatch(clearNotification());
    }
  }, [notification, dispatch]);
  return (
    <>
      <nav className="navbar fixed-top">
        <Link
          style={{ fontFamily: "Fredoka One" }}
          to="/"
          className="navbar-brand d-flex align-items-center"
        >
          FlickBase
        </Link>
        <SideDrawer signOutUser={signOutUser} />
      </nav>
    </>
  );
};

export default withRouter(Header);
