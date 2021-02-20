import React, { useEffect, useState } from "react";

import {
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  IconButton,
  TablePagination,
  TableContainer,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";

import { fetchAllUsers, createNewUser } from "../../api/usersService";

import PopupAddUser from "../Popup/AddUser";
import AddUserForm from "../Popup/AddUserForm";

const style = {
  display: "flex",
  justifyContent: "center",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ListUserComponent() {
  const [users, setUsers] = useState([]);
  const [usersFilterAdd, setUsersFilterAdd] = useState(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [addUserRes, setAddUserRes] = useState({
    typeAlert: "success",
    message: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchAllUsers().then((data) => {
      setUsers(data);
    });
  }, [usersFilterAdd]);

  const handleAddUser = () => {
    setOpenPopup(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addOrEdit = (values, resetForm) => {
    setRecordForEdit(null);

    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      password: values.password,
      address: values.address,
      phone: values.mobile,
      amount: values.amount,
      role: values.roleId,
      email: values.email,
    };

    createNewUser(newUser)
      .then((data) => {
        resetForm();
        setOpenPopup(false);
        setOpen(true);
        setAddUserRes({ typeAlert: "success", message: "Created user" });
        setUsersFilterAdd(data);
      })
      .catch((err) => {
        setOpen(true);
        setAddUserRes({ typeAlert: "error", message: err.message });
      });
  };

  // const openInPopup = (item) => {
  //   setRecordForEdit(item);
  //   setOpenPopup(true);
  // };

  return (
    <div>
      <Typography variant="h4" style={style}>
        Users Details
      </Typography>
      <Box style={{ position: "relative" }}>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
        <PopupAddUser
          title="User Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddUserForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </PopupAddUser>
        <TextField
          style={{ position: "absolute", right: 0 }}
          label="Search..."
          id="outlined-size-small"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Paper style={{ marginTop: 10 }}>
        <TableContainer style={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align="justify">View</TableCell>
                <TableCell align="justify">Edit</TableCell>
                <TableCell align="justify">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell align="justify">
                      <IconButton onClick={() => console.log("s")}>
                        <VisibilityIcon style={{ color: "black" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="justify">
                      <IconButton onClick={() => console.log("s")}>
                        <CreateIcon style={{ color: "black" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="justify">
                      <IconButton onClick={() => console.log("a")}>
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={addUserRes.typeAlert}>
          {addUserRes.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ListUserComponent;
