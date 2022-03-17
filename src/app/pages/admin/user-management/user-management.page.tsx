import { useEffect, useState } from "react";
import { User } from "@app/models/user.model";
import UserService from "@app/services/http/user.service";
import useObservable from "@core/hooks/use-observable.hook";
import {
  Container,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  Visibility as VisibilityIcon,
  Create as CreateIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "./make-style";
import ConfirmDialog from "@app/components/confirm-dialog";
import { PaginationOption } from "@core/services/http/http.service";
import { DEFAULT_PAGINATION_OPTION } from "@app/shared/constants/common";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UserManagement() {
  const classes = useStyles();

  const { subscribeUntilDestroy } = useObservable();

  const [users, setUsers] = useState<User[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [pagination, setPagination] = useState<PaginationOption>(() => {
    return DEFAULT_PAGINATION_OPTION;
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [responseAlert, setResponseAlert] = useState({
    typeAlert: "success",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    subscribeUntilDestroy(UserService.getList(), (data: User[]) => {
      setUsers(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openViewDialog = (item) => {
    // const itemView = {
    //   id: item.id,
    //   lastName: item.lastName,
    //   firstName: item.firstName,
    //   email: item.email,
    //   address: item.address,
    //   username: item.username,
    //   amount: item.amount,
    //   mobile: item.phone,
    //   roleId: item.role,
    //   createAt: item.createAt,
    //   updateAt: item.updateAt,
    // };
    // setIsView(true);
    // setIsEdit(false);
    // setRecordForEdit(itemView);
    // setOpenPopup(true);
  };

  const openInPopup = (item) => {
    // setIsView(false);
    // const itemEdit = {
    //   id: item.id,
    //   lastName: item.lastName,
    //   firstName: item.firstName,
    //   email: item.email,
    //   address: item.address,
    //   username: item.username,
    //   amount: item.amount,
    //   mobile: item.phone,
    //   roleId: item.role,
    //   password: "",
    //   cfPassword: "",
    // };
    // setIsEdit(true);
    // setRecordForEdit(itemEdit);
    // setOpenPopup(true);
  };

  const openConfirmDialog = (item) => {
    // setConfirmOpen(true);
    // setRecordForDelete(item);
  };

  const handleDeleteUser = () => {
    // if (userState.userId === recordForDelete.id) {
    //   setOpenAlert(true);
    //   setUserRes({
    //     typeAlert: "error",
    //     message: "Could not delete your account",
    //   });
    //   return;
    // }
    // deleteUser(recordForDelete.id)
    //   .then((data) => {
    //     setOpenAlert(true);
    //     setUserRes({ typeAlert: "success", message: "Deleted user" });
    //     setUsersFilterAdd(data);
    //   })
    //   .catch((err) => {
    //     setOpenAlert(true);
    //     setUserRes({ typeAlert: "error", message: err.message });
    //   });
  };

  const handlePageChange = (event, newPage) => {
    // setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    // setRowsPerPage(+event.target.value);
    // setPage(0);
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" className={classes.screenName}>
        Users Management
      </Typography>
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
              {!!users.length &&
                users
                  .slice(
                    (pagination.page - 1) * pagination.perPage,
                    (pagination.page - 1) * pagination.perPage +
                      pagination.perPage
                  )
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
          component="div"
          count={users.length}
          page={pagination.page - 1}
          rowsPerPage={pagination.perPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseAlert.typeAlert}>
          {responseAlert.message}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        title="Delete User?"
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        onConfirm={handleDeleteUser}
      >
        Are you sure you want to delete user:{" "}
        {/* {recordForDelete && recordForDelete.username}? */}
      </ConfirmDialog>
    </Container>
  );
}

export default UserManagement;
