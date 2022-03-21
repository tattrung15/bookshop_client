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
import { useStyles } from "./make-style";
import { useSnackbar } from "notistack";
import useForceUpdate from "@core/hooks/use-force-update.hook";
import useObservable from "@core/hooks/use-observable.hook";
import { Category, UpdateCategoryDto } from "@app/models/category.model";
import {
  DEFAULT_PAGINATION_OPTION,
  FETCH_TYPE,
  TYPE_ALERT,
} from "@app/shared/constants/common";
import CategoryService, {
  CategoryPaginationOption,
} from "@app/services/http/category.service";
import { ResponseResult } from "@core/services/http/http.service";
import PopupDialog from "@app/components/popup-dialog";
import ConfirmDialog from "@app/components/confirm-dialog";

function CategoryManagement() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const typingTimeoutRef = useRef<any>(null);

  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [recordForAction, setRecordForAction] = useState<any>(
    new Category(null)
  );
  const [pagination, setPagination] = useState(() => {
    const options: CategoryPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      fetchType: FETCH_TYPE.ADMIN,
    };
    return options;
  });

  useEffect(() => {
    subscribeUntilDestroy(
      CategoryService.getList(pagination),
      (response: ResponseResult) => {
        setCategories(response.data as Category[]);
        setTotal(response?.pagination?.total || 0);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, forceUpdate]);

  const onAddCategoryClick = () => {
    // setIsView(false);
    // setIsEdit(false);
    // setRecordForAction(new User(null));
    // setIsOpenPopup(true);
  };

  const openViewDialog = (item: Category) => {
    // const itemView: UpdateUserDto = {
    //   id: item.id,
    //   lastName: item.lastName,
    //   firstName: item.firstName,
    //   email: item.email,
    //   address: item.address,
    //   username: item.username,
    //   amount: item.amount,
    //   phone: item.phone,
    //   roleId: item.role,
    //   createdAt: item.createdAt,
    //   updatedAt: item.updatedAt,
    // };
    // setIsView(true);
    // setIsEdit(false);
    // setRecordForAction(itemView);
    // setIsOpenPopup(true);
  };

  const openInPopup = (item: Category) => {
    // const itemEdit: UpdateUserDto = {
    //   id: item.id,
    //   lastName: item.lastName,
    //   firstName: item.firstName,
    //   email: item.email,
    //   address: item.address,
    //   username: item.username,
    //   amount: item.amount,
    //   phone: item.phone,
    //   roleId: item.role,
    //   password: "",
    //   cfPassword: "",
    // };
    // setIsView(false);
    // setIsEdit(true);
    // setRecordForAction(itemEdit);
    // setIsOpenPopup(true);
  };

  const addOrEdit = (values: UpdateCategoryDto, resetForm: () => void) => {
    if (isEdit) {
      // const editUserId = values.id;
      // const editUserBody: Partial<UpdateUserDto> = {
      //   firstName: values.firstName,
      //   lastName: values.lastName,
      //   password: values.password ? values.password : null,
      //   address: values.address,
      //   phone: values.phone,
      //   amount: values.amount,
      //   role: values.roleId,
      //   email: values.email,
      // };
      // Object.keys(editUserBody).forEach(
      //   (key) => editUserBody[key] === null && delete editUserBody[key]
      // );
      // subscribeOnce(UserService.updateUser(editUserId, editUserBody), () => {
      //   enqueueSnackbar("Update user successfully", {
      //     variant: TYPE_ALERT.SUCCESS,
      //   });
      //   resetForm();
      //   setIsOpenPopup(false);
      //   setRecordForAction(new User(null));
      //   setForceUpdate();
      // });
    } else {
      // const newUser: CreateUserDto = {
      //   firstName: values.firstName,
      //   lastName: values.lastName,
      //   username: values.username,
      //   password: values.password ?? "",
      //   address: values.address,
      //   phone: values.phone,
      //   amount: values.amount,
      //   role: values.roleId,
      //   email: values.email,
      // };
      // subscribeOnce(UserService.createUser(newUser), () => {
      //   enqueueSnackbar("Create user successfully", {
      //     variant: TYPE_ALERT.SUCCESS,
      //   });
      //   resetForm();
      //   setIsOpenPopup(false);
      //   setForceUpdate();
      // });
    }
  };

  const openConfirmDialog = (item: Category) => {
    setConfirmDialogOpen(true);
    setRecordForAction(item);
  };

  const handleDeleteCategory = () => {
    subscribeOnce(CategoryService.deleteUser(recordForAction.id), () => {
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
    const newPagination: CategoryPaginationOption = {
      ...pagination,
      page: newPage + 1,
    };
    setPagination(newPagination);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newPagination: CategoryPaginationOption = {
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
      const newPaginationOption: CategoryPaginationOption = {
        ...pagination,
        like: {
          name: value,
        },
      };
      setPagination(newPaginationOption);
    }, 500);
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" className={classes.screenName}>
        Category Management
      </Typography>
      <Box style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddCategoryClick}
        >
          Add category
        </Button>
        <PopupDialog
          title="Category form"
          openPopup={isOpenPopup}
          setOpenPopup={setIsOpenPopup}
        >
          {/* <CategoryForm
            isEdit={isEdit}
            isView={isView}
            recordForAction={recordForAction}
            addOrEdit={addOrEdit}
          /> */}
        </PopupDialog>
        <TextField
          style={{ marginLeft: "1em" }}
          label="Search name..."
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
                <TableCell width="10%">STT</TableCell>
                <TableCell width="20%">Category Name</TableCell>
                <TableCell width="29%">Description</TableCell>
                <TableCell width="20%">Parent Category</TableCell>
                <TableCell width="7%" align="center">
                  View
                </TableCell>
                <TableCell width="7%" align="center">
                  Edit
                </TableCell>
                <TableCell width="7%" align="center">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!categories.length &&
                categories.map((item: Category, index: number) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.description?.substring(0, 90)}
                      {item.description &&
                        item.description.length > 90 &&
                        "..."}
                    </TableCell>
                    <TableCell>{item.parentCategory?.name}</TableCell>
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
        onConfirm={handleDeleteCategory}
      >
        {recordForAction &&
          "Do you want to delete category: " + recordForAction.name}
        ?
      </ConfirmDialog>
    </Container>
  );
}

export default CategoryManagement;
