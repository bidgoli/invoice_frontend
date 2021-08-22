/**
 * Modified version of an official example of material-ui
 * https://material-ui.com/components/dialogs/#form-dialogs
 */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import {
  DialogProps,
  Invoice,
  Status,
  statusList,
  TextValues,
} from "../helpers/types";

export default function FormDialog(props: DialogProps) {
  const requiredFields = ["id", "firstName", "lastName", "price"];
  const numerical = ["id", "price"];
  const defaultStatus: Status = "Open";

  const isRequired = (field: keyof TextValues): boolean =>
    requiredFields.indexOf(field) !== -1;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<Status>(defaultStatus);
  const [textValues, setTextValues] = useState({} as TextValues);

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as Status);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleSubmit = () => {
    const missingFields = requiredFields.filter(
      (rf) => !textValues[rf as keyof TextValues]
    );

    if (missingFields.length === 0) {
      setDialogOpen(false);
      const invoice: Invoice = {
        ...textValues,
        status,
        dueDate: selectedDate as Date,
        creationDate: new Date(),
      };
      props.handleAddInvoice(invoice);
      setStatus(() => defaultStatus);
      setTextValues(() => ({} as TextValues));
      setSelectedDate(() => new Date());
    } else {
      alert(`Please fill in the required fields: ${missingFields.join(", ")}.`);
    }
  };

  const handleTextChange = (
    event: React.ChangeEvent<{ value: unknown; id: unknown }>
  ) => {
    const key = event.target.id as keyof TextValues;
    const rawValue = event.target.value as string;
    const value = numerical.includes(key)
      ? rawValue.replace(/[^0-9]/g, "")
      : rawValue;
    setTextValues({ ...textValues, [key]: value });
  };

  return (
    <div>
      <div className="buttonlist">
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Add Invoice
        </Button>
      </div>
      <Dialog
        open={dialogOpen}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Invoice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form below and press SUBMIT.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="Invoice Id"
            type="id"
            fullWidth
            value={textValues.id}
            required={isRequired("id")}
            onChange={handleTextChange}
          />

          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            type="firstName"
            fullWidth
            value={textValues.firstName}
            required={isRequired("firstName")}
            onChange={handleTextChange}
          />

          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="lastName"
            fullWidth
            value={textValues.lastName}
            required={isRequired("lastName")}
            onChange={handleTextChange}
          />

          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="price"
            fullWidth
            value={textValues.price}
            required={isRequired("price")}
            onChange={handleTextChange}
          />

          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={textValues.email}
            required={isRequired("email")}
            onChange={handleTextChange}
          />

          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="description"
            fullWidth
            value={textValues.description}
            required={isRequired("description")}
            onChange={handleTextChange}
          />

          {/* Simplified version of official material ui Drop Down https://material-ui.com/components/selects/#simple-select */}

          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              value={status}
              onChange={handleStatusChange}
            >
              {Object.keys(statusList).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Simplified version of official material ui Date Picker https://material-ui.com/components/pickers/#material-ui-pickers*/}

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="Due Date"
              fullWidth
              label="Due Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
