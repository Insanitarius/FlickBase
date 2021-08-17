import React from "react";
import { useSelector } from "react-redux";
import AdminLayout from "../../hoc/adminLayout";

const Dashboard = () => {
  const user = useSelector((state) => state.users);
  const stripMail = () => {
    let temp;
    if (user && user.data.email) {
      temp = user.data.email.split("@");
      return temp[0];
    } else {
      return "<please completely your profile>";
    }
  };
  return (
    <>
      <AdminLayout section={"Dashboard"}>
        <h4 className="mt-4" style={{ textAlign: "center" }}>
          Welcome back, {"  "}
          <b>
            <u>
              {user && user.data.firstname ? user.data.firstname : stripMail()}
            </u>{" "}
          </b>
        </h4>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
