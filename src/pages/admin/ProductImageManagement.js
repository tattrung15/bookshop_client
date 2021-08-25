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
  Backdrop,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";

import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import PopupForm from "../../components/Popup";
import AddProductImageForm from "../../components/Popup/AddProductImageForm";

import {
  fetchAllProductsHaveImage,
  fetchAllProductsNoImage,
  fetchProductHaveImageLikeTitle,
  createNewProductImages,
  updateProductImages,
  deleteProductImages,
} from "../../api/productImageService";

const style = {
  display: "flex",
  justifyContent: "center",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function CategoriesManagement() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [actionFilter, setActionFilter] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [productsNoImage, setProductsNoImage] = useState([]);
  const [recordForDelete, setRecordForDelete] = useState(null);
  const handleCloseBackDrop = () => {
    setOpenBackdrop(false);
  };
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
    fetchAllProductsHaveImage()
      .then((data) => {
        setProductImages(data);
      })
      .catch((err) => {});
    fetchAllProductsNoImage()
      .then((data) => {
        const productsNoImageList = data.map((item) => {
          let productImage = {};
          productImage.id = item.product.id;
          productImage.title = item.product.title;
          return productImage;
        });
        setProductsNoImage(productsNoImageList);
      })
      .catch((err) => {
        setProductsNoImage([]);
      });
  }, [actionFilter]);

  const handleDelete = () => {
    deleteProductImages(recordForDelete.product.id)
      .then((data) => {
        setOpenAlert(true);
        setAlertResponse({
          typeAlert: "success",
          message: "Deleted product images",
        });
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
    fetchProductHaveImageLikeTitle(searchState)
      .then((data) => {
        setProductImages(data);
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
      productId: item.product.id,
      title: item.product.title,
      longDescription: item.product.longDescription,
    };
    setIsEdit(true);
    setRecordForEdit(itemEdit);
    setOpenPopup(true);
  };

  const openViewDialog = (item) => {
    const itemView = {
      id: item.product.id,
      title: item.product.title,
      longDescription: item.product.longDescription,
      productImages: item.productImages,
    };
    setIsView(true);
    setIsEdit(false);
    setRecordForEdit(itemView);
    setOpenPopup(true);
  };

  const addOrEdit = (values, resetForm) => {
    if (values.productImages.length === 0) {
      setAlertResponse({
        typeAlert: "error",
        message: "Please select image",
      });
      setOpenAlert(true);
      return;
    }
    setRecordForEdit(null);
    if (isEdit) {
      setOpenBackdrop(!openBackdrop);
      const editItemId = values.productId;
      const editItemBody = values.productImages;
      updateProductImages(editItemId, editItemBody)
        .then((data) => {
          resetForm();
          setOpenPopup(false);
          setOpenAlert(true);
          setAlertResponse({
            typeAlert: "success",
            message: "Updated product images",
          });
          setActionFilter(data);
          setOpenBackdrop(false);
        })
        .catch((err) => {
          setOpenAlert(true);
          setAlertResponse({ typeAlert: "error", message: err.message });
          setOpenBackdrop(false);
        });
      return;
    }
    setOpenBackdrop(!openBackdrop);
    createNewProductImages(values)
      .then((data) => {
        resetForm();
        setOpenPopup(false);
        setAlertResponse({
          typeAlert: "success",
          message: "Created product images",
        });
        setOpenAlert(true);
        setActionFilter(data);
        setOpenBackdrop(false);
      })
      .catch((err) => {
        setAlertResponse({ typeAlert: "error", message: err.message });
        setOpenAlert(true);
        setOpenBackdrop(false);
      });
  };

  return (
    <div>
      <Typography variant="h4" style={style}>
        Products Images Details
      </Typography>
      <Box style={{ position: "relative" }}>
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Product Images
        </Button>
        <PopupForm
          title="Product Image Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddProductImageForm
            isEdit={isEdit}
            isView={isView}
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
            productsNoImage={productsNoImage}
          />
          <Backdrop
            className={classes.backdrop}
            open={openBackdrop}
            onClick={handleCloseBackDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
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
                <TableCell width="42%">Title</TableCell>
                <TableCell width="30%">Number Of Images</TableCell>
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
              {productImages.length !== 0 &&
                productImages
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.product.title}</TableCell>
                      <TableCell>{item.productImages.length}</TableCell>
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
          count={productImages.length}
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
        title="Delete Product Image?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete product images:{" "}
        {recordForDelete && recordForDelete.product.title}?
      </ConfirmDialog>
    </div>
  );
}
