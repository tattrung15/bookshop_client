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
  Grid,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Controls from "../../components/controls/Controls";

import { Form } from "../../components/Popup/UseForm";

import PopupForm from "../../components/Popup";
import ViewSaleOrder from "../../components/Popup/ViewSaleOrder";
import EditSaleOrder from "../../components/Popup/EditSaleOrder";

import {
  fetchSearchSaleOrderById,
  fetchSaleOrderByDeliveryId,
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
  const [searchState, setSearchState] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFilter, setActionFilter] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForView, setRecordForView] = useState(null);
  const [openPopupEdit, setOpenPopupEdit] = useState(false);
  const [openPopupView, setOpenPopupView] = useState(false);
  const [deliverySelected, setDeliverySelected] = useState(0);
  const [deliveriesSelect, setDeliveriesSelect] = useState([]);
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
    fetchAllDeliveries()
      .then((data) => {
        setDeliveries(data);
        const listItemDeliveries = data.map((item) => {
          let delivery = {};
          delivery.id = item.id;
          delivery.title = item.value;
          return delivery;
        });
        setDeliveriesSelect(listItemDeliveries);
        setDeliverySelected(listItemDeliveries[1].id);
      })
      .catch((err) => {});
  }, []);

  const handleSearchChange = (event) => {
    setSearchState(event.target.value);
  };

  useEffect(() => {
    if (searchState) {
      fetchSearchSaleOrderById(searchState)
        .then((data) => {
          setSaleOrders(data);
        })
        .catch((err) => {});
    } else {
      fetchSaleOrderByDeliveryId(deliverySelected)
        .then((data) => {
          setSaleOrders(data);
        })
        .catch((err) => {
          setSaleOrders([]);
        });
    }
  }, [searchState, deliverySelected]);

  useEffect(() => {
    fetchSaleOrderByDeliveryId(deliverySelected)
      .then((data) => {
        setSaleOrders(data);
      })
      .catch((err) => {
        setSaleOrders([]);
      });
  }, [deliverySelected, actionFilter]);

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

  const handleSelectedDeliveryChange = (e) => {
    setDeliverySelected(e.target.value);
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
        <Box style={{ display: "flex" }}>
          <Box style={{ marginTop: "1em" }}>
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
          <Box style={{ marginLeft: "2em" }}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Grid container>
                <Grid item style={{ width: "20em" }}>
                  {deliverySelected && (
                    <Controls.Select
                      name="deliveryId"
                      label="Filter by delivery"
                      value={deliverySelected}
                      options={deliveriesSelect}
                      onChange={handleSelectedDeliveryChange}
                    />
                  )}
                </Grid>
              </Grid>
            </Form>
          </Box>
        </Box>
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
