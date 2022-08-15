import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const TableData = (props) => {
  const { rows } = props;

  const [open, setOpen] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [delId, setDelId] = useState("");

  const handleDelete = () => {};
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ? rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.age}</TableCell>
                    <TableCell align="center">{row.mobile}</TableCell>
                    <TableCell align="center">{row.address}</TableCell>
                    <TableCell align="center">{row.modify}</TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableData;
