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

import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import PopupForm from "../../components/Popup";
import AddCategoryForm from "../../components/Popup/AddCategoryForm";

import {
  fetchAllCategories,
  fetchCategoriesLikeName,
  deleteCategory,
  updateCategory,
  createNewCategory,
} from "../../api/categoryService";

const style = {
  display: "flex",
  justifyContent: "center",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CategoriesManagement() {
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionFilter, setActionFilter] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForDelete, setRecordForDelete] = useState(null);
  const [alertResponse, setAlertResponse] = useState({
    typeAlert: "success",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const openConfirmDialog = (item) => {
    setConfirmOpen(true);
    setRecordForDelete(item);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {});
  }, [actionFilter]);

  const handleDeleteCategory = () => {
    deleteCategory(recordForDelete.id)
      .then((data) => {
        setOpenAlert(true);
        setAlertResponse({ typeAlert: "success", message: "Deleted category" });
        setActionFilter(data);
      })
      .catch((err) => {
        setOpenAlert(true);
        setAlertResponse({ typeAlert: "error", message: err.message });
      });
  };

  const handleSearchChange = (event) => {
    setSearchState(event.target.value);
  };

  useEffect(() => {
    fetchCategoriesLikeName(searchState)
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {});
  }, [searchState]);

  const handleAddItem = () => {
    setIsView(false);
    setRecordForEdit(null);
    setIsEdit(false);
    setOpenPopup(true);
  };

  const openInPopup = (item) => {
    setIsView(false);
    const itemEdit = {
      id: item.id,
      name: item.name,
      description: item.description,
      createAt: item.createAt,
      updateAt: item.updateAt,
    };
    setIsEdit(true);
    setRecordForEdit(itemEdit);
    setOpenPopup(true);
  };

  const openViewDialog = (item) => {
    const itemView = {
      id: item.id,
      name: item.name,
      description: item.description,
      createAt: item.createAt,
      updateAt: item.updateAt,
    };
    setIsView(true);
    setIsEdit(false);
    setRecordForEdit(itemView);
    setOpenPopup(true);
  };

  const addOrEdit = (values, resetForm) => {
    setRecordForEdit(null);
    if (isEdit) {
      const editItemId = values.id;
      const editItemBody = {
        name: values.name,
        description: values.description,
      };
      Object.keys(editItemBody).forEach(
        (key) => editItemBody[key] == null && delete editItemBody[key]
      );
      updateCategory(editItemId, editItemBody)
        .then((data) => {
          resetForm();
          setOpenPopup(false);
          setOpenAlert(true);
          setAlertResponse({
            typeAlert: "success",
            message: "Updated category",
          });
          setActionFilter(data);
        })
        .catch((err) => {
          setOpenAlert(true);
          setAlertResponse({ typeAlert: "error", message: err.message });
        });
      return;
    }
    const newItem = {
      name: values.name,
      description: values.description,
    };
    createNewCategory(newItem)
      .then((data) => {
        resetForm();
        setOpenPopup(false);
        setOpenAlert(true);
        setAlertResponse({
          typeAlert: "success",
          message: "Created category",
        });
        setActionFilter(data);
      })
      .catch((err) => {
        setOpenAlert(true);
        setAlertResponse({ typeAlert: "error", message: err.message });
      });
  };

  return (
    <div>
      <Typography variant="h4" style={style}>
        Categories Details
      </Typography>
      <Box style={{ position: "relative" }}>
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Category
        </Button>
        <PopupForm
          title="Category Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddCategoryForm
            isEdit={isEdit}
            isView={isView}
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
          />
        </PopupForm>
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
                <TableCell width="10%">STT</TableCell>
                <TableCell width="20%">Category Name</TableCell>
                <TableCell width="49%" align="center">
                  Description
                </TableCell>
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
              {categories.length !== 0 &&
                categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {item.description.substring(0, 90)}
                        {item.description.length > 90 && "..."}
                      </TableCell>
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertResponse.typeAlert}>
          {alertResponse.message}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        title="Delete Category?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDeleteCategory}
      >
        Are you sure you want to delete category:{" "}
        {recordForDelete && recordForDelete.name}?
      </ConfirmDialog>
    </div>
  );
}
