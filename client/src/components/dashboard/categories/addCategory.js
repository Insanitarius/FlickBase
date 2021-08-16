import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@material-ui/core";
import { addCategory } from "../../../store/actions/article_actions";

const AddCategory = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name of the caregory is required")
        .max(100, "The max character limit is 100"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addCategory(values));
      resetForm();
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
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="name"
            label="Enter a category name"
            variant="outlined"
            {...formik.getFieldProps("name")}
            {...errorHelper(formik, "name")}
          />
          <Button
            className="mt-2"
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Category
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddCategory;
