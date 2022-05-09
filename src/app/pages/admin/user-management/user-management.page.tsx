import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Visibility as VisibilityIcon,
  Create as CreateIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { CreateUserDto, UpdateUserDto, User } from "@app/models/user.model";
import UserService from "@app/services/http/user.service";
import useObservable from "@core/hooks/use-observable.hook";
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
import useForceUpdate from "@core/hooks/use-force-update.hook";
import PopupDialog from "@app/components/popup-dialog";
import UserForm from "@app/components/user-form";

function UserManagement() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { id: userId } = useSelector(selectAuth);

  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const typingTimeoutRef = useRef<any>(null);

  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [recordForAction, setRecordForAction] = useState<any>(new User(null));
  const [pagination, setPagination] = useState(() => {
    const options: PaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
    };
    return options;
  });

  useEffect(() => {
    subscribeUntilDestroy(
      UserService.getList(pagination),
      (response: ResponseResult) => {
        setUsers(response.data as User[]);
        setTotal(response.pagination?.total || 0);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, forceUpdate]);

  const onAddUserClick = () => {
    setIsView(false);
    setIsEdit(false);
    setRecordForAction(new User(null));
    setIsOpenPopup(true);
  };

  const openViewDialog = (item: User) => {
    const itemView: UpdateUserDto = {
      id: item.id,
      lastName: item.lastName,
      firstName: item.firstName,
      email: item.email,
      address: item.address,
      username: item.username,
      amount: item.amount,
      phone: item.phone,
      roleId: item.role,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
    setIsView(true);
    setIsEdit(false);
    setRecordForAction(itemView);
    setIsOpenPopup(true);
  };

  const openInPopup = (item: User) => {
    const itemEdit: UpdateUserDto = {
      id: item.id,
      lastName: item.lastName,
      firstName: item.firstName,
      email: item.email,
      address: item.address,
      username: item.username,
      amount: item.amount,
      phone: item.phone,
      roleId: item.role,
      password: "",
      cfPassword: "",
    };
    setIsView(false);
    setIsEdit(true);
    setRecordForAction(itemEdit);
    setIsOpenPopup(true);
  };

  const addOrEdit = (values: UpdateUserDto, resetForm: () => void) => {
    if (isEdit) {
      const editUserId = values.id;
      const editUserBody: Partial<UpdateUserDto> = {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password ? values.password : null,
        address: values.address,
        phone: values.phone,
        amount: values.amount,
        role: values.roleId,
        email: values.email,
      };
      Object.keys(editUserBody).forEach(
        (key) => editUserBody[key] === null && delete editUserBody[key]
      );
      subscribeOnce(UserService.updateUser(editUserId, editUserBody), () => {
        enqueueSnackbar("Cập nhật người dùng thành công", {
          variant: TYPE_ALERT.SUCCESS,
        });
        resetForm();
        setIsOpenPopup(false);
        setRecordForAction(new User(null));
        setForceUpdate();
      });
    } else {
      const newUser: CreateUserDto = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password ?? "",
        address: values.address,
        phone: values.phone,
        amount: values.amount,
        role: values.roleId,
        email: values.email,
      };

      subscribeOnce(UserService.createUser(newUser), () => {
        enqueueSnackbar("Tạo người dùng thành công", {
          variant: TYPE_ALERT.SUCCESS,
        });
        resetForm();
        setIsOpenPopup(false);
        setForceUpdate();
      });
    }
  };

  const openConfirmDialog = (item: User) => {
    setConfirmDialogOpen(true);
    setRecordForAction(item);
  };

  const handleDeleteUser = () => {
    if (userId === recordForAction.id) {
      enqueueSnackbar("Không thể xóa tài khoản của bạn", {
        variant: TYPE_ALERT.ERROR,
      });
      return;
    }

    subscribeOnce(UserService.deleteUser(recordForAction.id), () => {
      enqueueSnackbar("Xóa người dùng thành công", {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchState(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const newPaginationOption: PaginationOption = {
        ...pagination,
        like: {
          username: value,
        },
      };
      setPagination(newPaginationOption);
    }, 500);
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" className={classes.screenName}>
        Quản lý người dùng
      </Typography>
      <Box style={{ display: "flex" }}>
        <Button variant="contained" color="primary" onClick={onAddUserClick}>
          Thêm người dùng
        </Button>
        <PopupDialog
          title="Biểu mẫu người dùng"
          openPopup={isOpenPopup}
          setOpenPopup={setIsOpenPopup}
        >
          <UserForm
            isEdit={isEdit}
            isView={isView}
            recordForAction={recordForAction}
            addOrEdit={addOrEdit}
          />
        </PopupDialog>
        <TextField
          style={{ marginLeft: "1em" }}
          label="Tìm kiếm theo tên người dùng"
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
                <TableCell>Tên</TableCell>
                <TableCell>Họ</TableCell>
                <TableCell>Tên người dùng</TableCell>
                <TableCell>Điện thoại</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell align="center">Xem</TableCell>
                <TableCell width="7%" align="center">
                  Cập nhật
                </TableCell>
                <TableCell align="center">Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!users.length &&
                users.map((item, index) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => openViewDialog(item)}>
                        <VisibilityIcon style={{ color: "black" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => openInPopup(item)}>
                        <CreateIcon style={{ color: "black" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
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
        title="Xóa người dùng?"
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        onConfirm={handleDeleteUser}
      >
        {recordForAction &&
          "Bạn có muốn xóa người dùng: " + recordForAction.username}
        ?
      </ConfirmDialog>
    </Container>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default UserManagement;
