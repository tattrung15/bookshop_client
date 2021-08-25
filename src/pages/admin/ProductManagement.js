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
import AddProductForm from "../../components/Popup/AddProductForm";

import {
  fetchAllProducts,
  fetchProductsLikeTitle,
  createNewProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productService";

import { fetchAllCategories } from "../../api/categoryService";

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
  const [products, setProducts] = useState([]);
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
    fetchAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {});
  }, [actionFilter]);

  useEffect(() => {
    fetchAllCategories()
      .then((data) => {
        const listCategories = data.map((item) => {
          let category = {};
          category.id = item.id;
          category.title = item.name;
          return category;
        });
        setCategories(listCategories);
      })
      .catch((err) => {});
  }, []);

  const handleDelete = () => {
    deleteProduct(recordForDelete.id)
      .then((data) => {
        setOpenAlert(true);
        setAlertResponse({ typeAlert: "success", message: "Deleted product" });
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
    fetchProductsLikeTitle(searchState)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {});
  }, [searchState]);

  const handleAddItem = () => {
    setIsView(false);
    setIsEdit(false);
    setRecordForEdit(null);
    setOpenPopup(true);
  };

  const openInPopup = (item) => {
    setIsView(false);
    const itemEdit = {
      id: item.id,
      title: item.title,
      longDescription: item.longDescription,
      price: item.price,
      author: item.author,
      currentNumber: item.currentNumber,
      numberOfPage: item.numberOfPage,
      categoryId: item.category.id,
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
      title: item.title,
      longDescription: item.longDescription,
      price: item.price,
      author: item.author,
      currentNumber: item.currentNumber,
      numberOfPage: item.numberOfPage,
      quantityPurchased: item.quantityPurchased,
      createAt: item.createAt,
      updateAt: item.updateAt,
      categoryId: item.category.id,
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
        title: values.title,
        longDescription: values.longDescription,
        price: values.price,
        author: values.author,
        currentNumber: values.currentNumber,
        numberOfPage: values.numberOfPage,
        categoryId: values.categoryId,
      };
      Object.keys(editItemBody).forEach(
        (key) => editItemBody[key] == null && delete editItemBody[key]
      );
      updateProduct(editItemId, editItemBody)
        .then((data) => {
          resetForm();
          setOpenPopup(false);
          setOpenAlert(true);
          setAlertResponse({
            typeAlert: "success",
            message: "Updated product",
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
      title: values.title,
      longDescription: values.longDescription,
      price: values.price,
      author: values.author,
      currentNumber: values.currentNumber,
      numberOfPage: values.numberOfPage,
      categoryId: values.categoryId,
    };
    createNewProduct(newItem)
      .then((data) => {
        resetForm();
        setOpenPopup(false);
        setAlertResponse({
          typeAlert: "success",
          message: "Created product",
        });
        setOpenAlert(true);
        setActionFilter(data);
      })
      .catch((err) => {
        setAlertResponse({ typeAlert: "error", message: err.message });
        setOpenAlert(true);
      });
  };

  return (
    <div>
      <Typography variant="h4" style={style}>
        Products Details
      </Typography>
      <Box style={{ position: "relative" }}>
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Product
        </Button>
        <PopupForm
          title="Product Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddProductForm
            isEdit={isEdit}
            isView={isView}
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
            categories={categories}
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
                <TableCell width="7%">STT</TableCell>
                <TableCell width="37%">Title</TableCell>
                <TableCell width="15%">Price</TableCell>
                <TableCell width="20%">Author</TableCell>
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
              {products.length !== 0 &&
                products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.price.toLocaleString("vn")} đ</TableCell>
                      <TableCell>{item.author}</TableCell>
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
          count={products.length}
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
        title="Delete Product?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete product:{" "}
        {recordForDelete && recordForDelete.title}?
      </ConfirmDialog>
    </div>
  );
}
