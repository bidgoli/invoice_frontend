import React from "react";
import Button from "@material-ui/core/Button";
import { DetailProps } from "../helpers/types";
import { dateFormatter } from "../helpers/date";
import { sendEmail } from "../helpers/api";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export default function Detail(props: DetailProps) {
  const { invoice } = props;

  const [open, setOpen] = React.useState(false);

  const handleSendEmail = () => {
    sendEmail(invoice);
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="detail">
      <p>
        <strong>Description: </strong>
        {invoice.description}
      </p>

      <p>
        <strong>Email: </strong>
        {invoice.email}
      </p>

      <p>
        <strong>Creation Date: </strong>
        {dateFormatter(invoice.creationDate)}
      </p>

      <Button
        className="sendButton"
        variant="contained"
        color="default"
        disabled={!invoice.email}
        onClick={handleSendEmail}
      >
        Send Email
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
      >
        <MuiAlert
          onClose={handleClose}
          severity="info"
          elevation={6}
          variant="filled"
        >
          Sending the email.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
