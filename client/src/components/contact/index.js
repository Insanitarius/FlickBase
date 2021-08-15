import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { TextField, Button } from "@material-ui/core";
import Loader from "../../utils/loader";
import { contactMe } from "../../store/actions/users_actions";

const Contact = () => {
  const [loading, setLoading] = useState(null);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, email is required")
        .email("This is not a valid email"),
      firstname: Yup.string()
        .required("Sorry, firstname is required")
        .max(25, "Sorry, the character limit is 25"),
      lastname: Yup.string()
        .required("Sorry, lastname is required")
        .max(25, "Sorry, the character limit is 25"),
      message: Yup.string()
        .required("Sorry, the message cannot be empty")
        .max(500, "Sorry, the message is too long"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      dispatch(contactMe(values));
    },
  });

  useEffect(() => {
    if (notification && notification.success) {
      formik.resetForm();
      setLoading(false);
    }
  }, [notification, formik]);

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Contact me</h1>
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="email"
                label="Enter your email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                {...errorHelper(formik, "email")}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="firstname"
                label="Enter your firstname"
                variant="outlined"
                {...formik.getFieldProps("firstname")}
                {...errorHelper(formik, "firstname")}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="lastname"
                label="Enter your lastname"
                variant="outlined"
                {...formik.getFieldProps("lastname")}
                {...errorHelper(formik, "lastname")}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="message"
                label="Add your message here"
                variant="outlined"
                multiline
                rows={4}
                message
                {...formik.getFieldProps("message")}
                {...errorHelper(formik, "message")}
              />
            </div>

            <Button variant="contained" color="primary" type="submit">
              {" "}
              Send me a message
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default Contact;
