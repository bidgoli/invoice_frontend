/**
 * Simplified version of an official example of material-ui
 * https://material-ui.com/components/tables/#collapsible-table
 */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  InvoiceListProps,
  RowProps,
  Status,
  statusList,
} from "../helpers/types";
import Detail from "./Detail";
import { dateFormatter } from "../helpers/date";
import moment from "moment";
import { MenuItem, Select } from "@material-ui/core";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props: RowProps) {
  const { invoice, updateStatus } = props;
  const [open, setOpen] = useState(false);

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newStatus = event.target.value as Status;
    updateStatus(invoice.id, newStatus);
  };

  const classes = useRowStyles();
  const rowColor = moment().isAfter(invoice.dueDate) ? "#ffeeee" : "";

  return (
    <React.Fragment>
      <TableRow className={classes.root} style={{ backgroundColor: rowColor }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {invoice.id}
        </TableCell>
        <TableCell align="right">{`${invoice.firstName} ${invoice.lastName}`}</TableCell>
        <TableCell align="right">{dateFormatter(invoice.dueDate)}</TableCell>
        <TableCell align="right">{invoice.price}</TableCell>
        <TableCell align="right">
          <Select
            labelId="status"
            id="status"
            value={invoice.status}
            onChange={handleStatusChange}
          >
            {Object.keys(statusList).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Detail invoice={invoice} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function InvoiceList(props: InvoiceListProps) {
  const { invoiceList, updateStatus } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Invoice Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceList.map((invoice) => (
            <Row
              key={invoice.id}
              invoice={invoice}
              updateStatus={updateStatus}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
