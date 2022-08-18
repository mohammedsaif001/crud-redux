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
import { deleteUserAxios } from "../function/axiosFunctions";
import { useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";

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
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleDelete = async () => {
    setOpen(false);

    // Deleting in Server
    let [message, variant] = await deleteUserAxios(delId);
    enqueueSnackbar(message, { variant: variant });

    // Deleting in Redux
    dispatch(deleteUser(delId));

    // delUser1(delId);
    // console.log(delId);
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
    dispatch(fetchUsers(page));
    // fetchUsers1(page);
  }, [page]);

  const [locationMessage, setLocationMessage] = useState({
    msg: "",
    variant: "",
  });

  const rows = userData
    ? userData.users.map((row) =>
        createData(
          // row._id,
          // row.name,
          // row.username,
          // row.phone,
          // row.website,
          row._id,
          row.name,
          row.age,
          row.ph,
          row.address,
          <>
            <IconButton
              aria-label="edit"
              onClick={() =>
                navigate(`/editPage/${row._id}`, {
                  // navigate(`/editPage/${row.id}`, {
                  state: [row.name, row.age, row.ph, row.address],
                })
              }
            >
              <ModeEditIcon color="success" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleClickOpen(row._id)}
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
        {/* {console.log(userData.users)} */}
        {console.log(userData.loading)}

        <div style={{ margin: "2% 20%" }}>
          <Stack
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            sx={{ mb: 2 }}
          >
            <div>Total Count = {totalCount}</div>
            <div>Page:{page}</div>
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
            <Pagination
              count={5}
              showFirstButton
              showLastButton
              // defaultPage={1}
              page={page}
              onChange={(event, value) => {
                setPage(value);
              }}
            />
          </Stack>
          <TableData rows={rows} />

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
    // fetchUsers1: () => dispatch(fetchUsers(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
