import React, { useState, useEffect } from "react";
import {
  Stack,
  Button,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogActions,
  Slide,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link, useLocation } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TableData from "./TableData";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MuiAlert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";

function createData(id, name, age, mobile, address, modify) {
  return { id, name, age, mobile, address, modify };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Details = ({ userData, fetchUsers1, delUser1 }) => {
  const [open, setOpen] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [delId, setDelId] = useState("");
  let navigate = useNavigate();

  const handleDelete = () => {
    delUser1(delId);
    console.log(delId);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (id) => {
    setDelId(id);
    setOpen(true);
    console.log(id);
  };
  const handleCloseDelete = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  useEffect(() => {
    fetchUsers1();
  }, []);

  const [locationMessage, setLocationMessage] = useState({
    msg: "",
    variant: "",
  });

  const rows = userData
    ? userData.users.map((row) =>
        createData(
          row.id,
          row.name,
          row.username,
          row.phone,
          row.website,
          // row._id,
          // row.name,
          // row.age,
          // row.ph,
          // row.address,
          <>
            <IconButton
              aria-label="edit"
              onClick={() =>
                navigate(`/editPage/${row._id}`, {
                  state: [row.name, row.age, row.ph, row.address],
                })
              }
            >
              <ModeEditIcon color="success" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleClickOpen(row.id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </>
        )
      )
    : "";

  return (
    <div>
      <>
        {console.log(rows)}
        {console.log(rows)}
        {/* {console.log(userData.users)} */}
        {console.log(userData.loading)}
        <div style={{ margin: "2% 20%" }}>
          <Stack
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            sx={{ mb: 2 }}
          >
            <Link
              to="/newpage"
              style={{ textDecoration: "none" }}
              state={["", "", "", ""]}
            >
              <Button
                endIcon={<AddCircleIcon />}
                color="success"
                variant="contained"
              >
                Add New
              </Button>
            </Link>
          </Stack>
          <TableData rows={rows} />
          {/* <TableContainer component={Paper}>
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
          </TableContainer> */}

          {/* Dialog Pop Up */}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Are You Sure You Want to Delete ?"}</DialogTitle>
            <DialogActions>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                endIcon={<CheckIcon />}
                size="small"
              >
                Yes
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                startIcon={<CancelIcon />}
                size="small"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          {/* Display User Message as Deleted */}
          <Snackbar
            open={openMessage}
            autoHideDuration={6000}
            onClose={handleCloseDelete}
          >
            {
              <Alert
                onClose={handleCloseDelete}
                severity={locationMessage?.variant}
                sx={{ width: "100%" }}
              >
                {locationMessage?.msg}
              </Alert>
            }
          </Snackbar>
          {console.log(locationMessage)}
        </div>
        {console.log(userData)}
        {console.log(rows)}
      </>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers1: () => dispatch(fetchUsers()),
    delUser1: () => dispatch(deleteUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
