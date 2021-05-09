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

import { useRecoilState } from "recoil";
import { userSeletor } from "../../recoil/userState";

import {
  fetchAllUsers,
  fetchUsersLikeUsername,
  createNewUser,
  updateUser,
  deleteUser,
} from "../../api/usersService";

import PopupAddUser from "../Popup/AddUser";
import AddUserForm from "../Popup/AddUserForm";
import ConfirmDialog from "../Dialog/ConfirmDialog";

const style = {
  display: "flex",
  justifyContent: "center",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ListUserComponent() {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchState, setSearchState] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [usersFilterAdd, setUsersFilterAdd] = useState(null);
  const [recordForDelete, setRecordForDelete] = useState(null);
  const [userState] = useRecoilState(userSeletor);
  const [userRes, setUserRes] = useState({
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
    fetchAllUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {});
  }, [usersFilterAdd]);

  const handleAddUser = () => {
    setIsView(false);
    setRecordForEdit(null);
    setIsEdit(false);
    setOpenPopup(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const addOrEdit = (values, resetForm) => {
    setRecordForEdit(null);
    if (isEdit) {
      const editUserId = values.id;
      const editUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password ? values.password : null,
        address: values.address,
        phone: values.mobile,
        amount: values.amount,
        role: values.roleId,
        email: values.email,
      };
      Object.keys(editUser).forEach(
        (key) => editUser[key] == null && delete editUser[key]
      );
      updateUser(editUserId, editUser)
        .then((data) => {
          resetForm();
          setOpenPopup(false);
          setOpenAlert(true);
          setUserRes({
            typeAlert: "success",
            message: "Edited user success",
          });
          setUsersFilterAdd(data);
        })
        .catch((err) => {
          setOpenAlert(true);
          setUserRes({ typeAlert: "error", message: err.message });
        });
      return;
    }

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
        setOpenAlert(true);
        setUserRes({
          typeAlert: "success",
          message: "Created user",
        });
        setUsersFilterAdd(data);
      })
      .catch((err) => {
        setOpenAlert(true);
        setUserRes({ typeAlert: "error", message: err.message });
      });
  };

  const openInPopup = (item) => {
    setIsView(false);
    const itemEdit = {
      id: item.id,
      lastName: item.lastName,
      firstName: item.firstName,
      email: item.email,
      address: item.address,
      username: item.username,
      amount: item.amount,
      mobile: item.phone,
      roleId: item.role,
      password: "",
      cfPassword: "",
    };
    setIsEdit(true);
    setRecordForEdit(itemEdit);
    setOpenPopup(true);
  };

  const openConfirmDialog = (item) => {
    setConfirmOpen(true);
    setRecordForDelete(item);
  };

  const handleDeleteUser = () => {
    if (userState.userId === recordForDelete.id) {
      setOpenAlert(true);
      setUserRes({
        typeAlert: "error",
        message: "Could not delete your account",
      });
      return;
    }
    deleteUser(recordForDelete.id)
      .then((data) => {
        setOpenAlert(true);
        setUserRes({ typeAlert: "success", message: "Deleted user" });
        setUsersFilterAdd(data);
      })
      .catch((err) => {
        setUserRes({ typeAlert: "error", message: err.message });
      });
  };

  const openViewDialog = (item) => {
    const itemView = {
      id: item.id,
      lastName: item.lastName,
      firstName: item.firstName,
      email: item.email,
      address: item.address,
      username: item.username,
      amount: item.amount,
      mobile: item.phone,
      roleId: item.role,
      createAt: item.createAt,
      updateAt: item.updateAt,
    };
    setIsView(true);
    setIsEdit(false);
    setRecordForEdit(itemView);
    setOpenPopup(true);
  };

  const handleSearchChange = (event) => {
    setSearchState(event.target.value);
  };

  useEffect(() => {
    fetchUsersLikeUsername(searchState)
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {});
  }, [searchState]);

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
          <AddUserForm
            isEdit={isEdit}
            isView={isView}
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
          />
        </PopupAddUser>
        <TextField
          style={{ position: "absolute", right: 0 }}
          label="Search..."
          id="outlined-size-small"
          variant="outlined"
          size="small"
          value={searchState}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchChange}
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
              {users.length !== 0 &&
                users
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
                        <IconButton onClick={() => openViewDialog(item)}>
                          <VisibilityIcon style={{ color: "black" }} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="justify">
                        <IconButton onClick={() => openInPopup(item)}>
                          <CreateIcon style={{ color: "black" }} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="justify">
                        <IconButton onClick={() => openConfirmDialog(item)}>
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
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={userRes.typeAlert}>
          {userRes.message}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        title="Delete User?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDeleteUser}
      >
        Are you sure you want to delete this user:{" "}
        {recordForDelete && recordForDelete.username}?
      </ConfirmDialog>
    </div>
  );
}

export default ListUserComponent;
