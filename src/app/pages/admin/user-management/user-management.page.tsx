import React, { useEffect, useState } from "react";
import { User } from "@app/models/user.model";
import UserService from "@app/services/http/user.service";
import useObservable from "@core/hooks/use-observable.hook";
import {
  Container,
  IconButton,
  Paper,
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
import { useStyles } from "./make-style";
import ConfirmDialog from "@app/components/confirm-dialog";
import {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
import {
  DEFAULT_PAGINATION_OPTION,
  TYPE_ALERT,
} from "@app/shared/constants/common";
import { GlobalState } from "@app/store";
import { useSelector } from "react-redux";
import useForceUpdate from "@core/hooks/use-force-update.hook";
import { useSnackbar } from "notistack";

function UserManagement() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { id: userId } = useSelector(selectAuth);

  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [recordForAction, setRecordForAction] = useState<User>(new User(null));
  const [pagination, setPagination] = useState<PaginationOption>(() => {
    return DEFAULT_PAGINATION_OPTION;
  });

  useEffect(() => {
    subscribeUntilDestroy(
      UserService.getList(pagination),
      (response: ResponseResult) => {
        setUsers(response.data as User[]);
        setTotal(response?.pagination?.total || 0);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, forceUpdate]);

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

  const openConfirmDialog = (item: User) => {
    setConfirmDialogOpen(true);
    setRecordForAction(item);
  };

  const handleDeleteUser = () => {
    if (userId === recordForAction.id) {
      enqueueSnackbar("Cannot delete your account", {
        variant: TYPE_ALERT.ERROR,
      });
      return;
    }

    subscribeOnce(UserService.deleteUser(recordForAction.id), () => {
      enqueueSnackbar("Delete user successfully", {
        variant: TYPE_ALERT.SUCCESS,
      });
      setForceUpdate();
    });
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    const newPagination: PaginationOption = {
      ...pagination,
      page: newPage + 1,
    };
    setPagination(newPagination);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newPagination: PaginationOption = {
      ...pagination,
      page: 1,
      perPage: +event.target.value,
    };
    setPagination(newPagination);
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" className={classes.screenName}>
        User Management
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
                users.map((item: User, index: number) => (
                  <TableRow hover key={item.id}>
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
          count={total}
          page={pagination.page - 1}
          rowsPerPage={pagination.perPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
      <ConfirmDialog
        title="Delete User?"
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        onConfirm={handleDeleteUser}
      >
        {recordForAction &&
          "Do you want to delete user: " + recordForAction.username}
        ?
      </ConfirmDialog>
    </Container>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default UserManagement;
