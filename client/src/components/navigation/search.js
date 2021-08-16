import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNavSearchResults } from "../../store/actions/article_actions";

import { TextField } from "@material-ui/core";

const NavSearch = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { keywords: "" },
    validationSchema: Yup.object({
      keywords: Yup.string()
        // .matches(/^[^\s]+[aA-zZ1-9]*/, "Remove trailing spaces")
        .required("Please enter something")
        .min(3, "Min 3 characters"),
    }),
    onSubmit: (value) => {
      dispatch(getNavSearchResults(1, 5, value.keywords.trim()));
      props.closeDrawer();
      props.history.push(`/searchresults?keywords=${value.keywords.trim()}`);
    },
  });

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });

  return (
    <>
      <form style={{ margin: "20px" }} onSubmit={formik.handleSubmit}>
        <TextField
          id="outlined-basic"
          name="keywords"
          label="Search Movie"
          variant="outlined"
          {...formik.getFieldProps("keywords")}
          {...errorHelper(formik, "keywords")}
        />
      </form>
    </>
  );
};

export default withRouter(NavSearch);
