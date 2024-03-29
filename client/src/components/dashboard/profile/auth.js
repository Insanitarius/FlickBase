import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Modal from "react-bootstrap/Modal";
import { Grid, TextField, Divider } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import EmailStepper from "./stepper/mail";

const AuthProfile = () => {
  const [emailModal, setEmailModal] = useState(false);
  const users = useSelector((state) => state.users);
  const notification = useSelector((state) => state.notification);

  const closeModal = () => setEmailModal(false);
  const openModal = () => setEmailModal(true);

  useEffect(() => {
    if (notification && notification.success) {
      closeModal();
    }
  }, [notification]);

  return (
    <div>
      <div className="mb-3 auth_grid">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField value={users.data.email} disabled />
          </Grid>
          <Grid item>
            <EditIcon color="primary" onClick={openModal} />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField value="************" disabled />
          </Grid>
          <Grid item>
            <EditIcon color="primary" />
          </Grid>
        </Grid>
      </div>
      <Divider />
      <Modal size="lg" centered show={emailModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmailStepper user={users} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AuthProfile;
