import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/loader";

import Favorite from "@material-ui/icons/Favorite";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import { accountVerify } from "../../store/actions/users_actions";

const iconStyle = {
  fontSize: "200px",
};

const AccountVerification = (props) => {
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const token = query.get("t");

  useEffect(() => {
    if (token) {
      dispatch(accountVerify(token));
    } else {
      props.history.push("/");
    }
  }, [dispatch, props.history, token]);

  useEffect(() => {
    if (notification && notification.error) {
      setIcon(<SentimentDissatisfiedIcon style={iconStyle} />);
      setLoading(false);
    }
    if (notification && notification.success) {
      setIcon(<Favorite style={iconStyle} />);

      setLoading(false);
    }
  }, [notification]);

  return (
    <>
      {loading ? <Loader /> : <div style={{ textAlign: "center" }}>{icon}</div>}
    </>
  );
};

export default AccountVerification;
