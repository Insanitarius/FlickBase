import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import SideDrawer from "./sideNavigation";

import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../../store/actions/index";
import { showToast } from "../../utils/tools";
import { signOut } from "../../store/actions/users_actions";
import { appLayout } from "../../store/actions/site_action";

const Header = (props) => {
  const [layout, setLayout] = useState("");
  const notification = useSelector((state) => state.notification);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(signOut());
    props.history.push("/");
  };

  useEffect(() => {
    let pathArray = props.location.pathname.split("/");
    if (pathArray[1] === "dashboard") {
      setLayout("dash_layout");
      dispatch(appLayout("dash_layout"));
    } else {
      setLayout("");
      dispatch(appLayout(""));
    }
  }, [props.location.pathname, dispatch]);

  useEffect(() => {
    if (notification && notification.error) {
      const msg = notification.msg
        ? notification.msg
        : "Sorry, something went wrong!";
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
      <nav className={`navbar sticky-top ${layout}`}>
        <Link
          style={{ fontFamily: "Fredoka One" }}
          to="/"
          className="navbar-brand d-flex align-items-center"
        >
          FlickBase
        </Link>
        <SideDrawer users={users} signOutUser={signOutUser} />
      </nav>
    </>
  );
};

export default withRouter(Header);
