import React, { useEffect, useState } from "react";
import moment from "moment";

import {
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TablePagination,
  TableContainer,
  Paper,
  Typography,
} from "@material-ui/core";

import { fetchSaleOrdersRecentOrders } from "../../api/saleOrderService";

function calculateTotalAmount(orderItems) {
  const totalAmount = orderItems.reduce((acc, currentValue) => {
    return acc + currentValue.product.price * currentValue.quantity;
  }, 0);
  return totalAmount;
}

export default function Orders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [saleOrdersRecent, setSaleOrdersRecent] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchSaleOrdersRecentOrders()
      .then((data) => {
        setSaleOrdersRecent(data);
      })
      .catch((err) => {
        setSaleOrdersRecent([]);
      });
  }, []);

  return (
    <React.Fragment>
      <Typography
        variant="h4"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Recent Orders
      </Typography>
      <Paper style={{ marginTop: 10 }}>
        <TableContainer style={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width="10%">Date</TableCell>
                <TableCell width="20%">Customer Name</TableCell>
                <TableCell width="15%">Customer Phone</TableCell>
                <TableCell width="40%">Ship To</TableCell>
                <TableCell width="15%" align="right">
                  Sale Amout
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saleOrdersRecent.length !== 0 &&
                saleOrdersRecent
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {moment(item.createAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {item.user.firstName + " " + item.user.lastName}
                      </TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.customerAddress}</TableCell>
                      <TableCell align="right">
                        {calculateTotalAmount(item.orderItems).toLocaleString(
                          "vn"
                        )}
                        đ
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={saleOrdersRecent.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}
