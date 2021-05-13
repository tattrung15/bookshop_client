import React, { useEffect, useState } from "react";

import {
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
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";

import PopupForm from "../../components/Popup";
import ViewSaleOrder from "../../components/Popup/ViewSaleOrder";
import EditSaleOrder from "../../components/Popup/EditSaleOrder";

import {
  fetchAllSaleOrders,
  fetchSearchSaleOrderById,
  updateSaleOrderById,
} from "../../api/saleOrderService";

import { fetchAllDeliveries } from "../../api/deliveryService";

const style = {
  display: "flex",
  justifyContent: "center",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CategoriesManagement() {
  const [page, setPage] = useState(0);
  const [deliveries, setDeliveries] = useState([]);
  const [saleOrders, setSaleOrders] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openPopupView, setOpenPopupView] = useState(false);
  const [openPopupEdit, setOpenPopupEdit] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFilter, setActionFilter] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForView, setRecordForView] = useState(null);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchAllSaleOrders()
      .then((data) => {
        setSaleOrders(data);
      })
      .catch((err) => {});
  }, [actionFilter]);

  useEffect(() => {
    fetchAllDeliveries()
      .then((data) => {
        setDeliveries(data);
      })
      .catch((err) => {});
  }, []);

  const handleSearchChange = (event) => {
    setSearchState(event.target.value);
  };

  useEffect(() => {
    fetchSearchSaleOrderById(searchState)
      .then((data) => {
        setSaleOrders(data);
      })
      .catch((err) => {});
  }, [searchState]);

  const openInPopup = (item) => {
    const itemEdit = {
      saleOrderId: item.id,
      delivery: item.delivery,
    };
    setRecordForEdit(itemEdit);
    setOpenPopupEdit(true);
  };

  const openViewDialog = (item) => {
    const itemView = {
      saleOrderId: item.id,
    };
    setRecordForView(itemView);
    setOpenPopupView(true);
  };

  const handleEditItem = (values) => {
    const editItemId = values.saleOrderId;
    const editItemBody = {
      deliveryId: values.deliveryId,
    };
    updateSaleOrderById(editItemId, editItemBody)
      .then((data) => {
        setOpenPopupEdit(false);
        setOpenAlert(true);
        setAlertResponse({
          typeAlert: "success",
          message: "Updated sale order",
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
        Sale Orders Details
      </Typography>
      <Box style={{ position: "relative" }}>
        <PopupForm
          title="View Sale Order"
          openPopup={openPopupView}
          setOpenPopup={setOpenPopupView}
        >
          <ViewSaleOrder recordForView={recordForView} />
        </PopupForm>
        <PopupForm
          title="Update Sale Order"
          openPopup={openPopupEdit}
          setOpenPopup={setOpenPopupEdit}
        >
          <EditSaleOrder
            recordForEdit={recordForEdit}
            deliveries={deliveries}
            handleEditItem={handleEditItem}
          />
        </PopupForm>
        <TextField
          label="Search by Sale Order Id:"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          value={searchState}
          type="number"
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
                <TableCell>Sale Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Customer Phone</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell width="7%" align="center">
                  View
                </TableCell>
                <TableCell width="7%" align="center">
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saleOrders.length !== 0 &&
                saleOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        {item.user.firstName + " " + item.user.lastName}
                      </TableCell>
                      <TableCell>{item.user.phone}</TableCell>
                      <TableCell>{item.delivery.value}</TableCell>
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
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={saleOrders.length}
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
    </div>
  );
}
