import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Container,
  Grid,
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
import { useStyles } from "./make-style";
import {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_PAGINATION_OPTION,
  FETCH_TYPE,
} from "@app/shared/constants/common";
import { SaleOrder } from "@app/models/sale-order.model";
import useObservable from "@core/hooks/use-observable.hook";
import SaleOrderService, {
  SaleOrderPaginationOption,
} from "@app/services/http/sale-order.service";
import { calculateTotalAmount } from "@app/shared/helpers/helpers";

function RecentOrderManagement() {
  const classes = useStyles();

  const { subscribeUntilDestroy } = useObservable();

  const [total, setTotal] = useState(0);
  const [saleOrders, setSaleOrders] = useState<SaleOrder[]>([]);
  const [pagination, setPagination] = useState(() => {
    const options: SaleOrderPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      fetchType: FETCH_TYPE.ADMIN,
    };
    return options;
  });

  useEffect(() => {
    subscribeUntilDestroy(
      SaleOrderService.getListForAdmin(pagination),
      (response: ResponseResult) => {
        setSaleOrders(response.data as SaleOrder[]);
        setTotal(response.pagination?.total || 0);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

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
    <Container maxWidth="lg" className={classes.container}>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.screenName}>
          Đơn đặt hàng gần đây
        </Typography>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableContainer style={{ maxHeight: 450 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell width="10%">Ngày</TableCell>
                    <TableCell width="20%">Tên khách hàng</TableCell>
                    <TableCell width="15%">Số điện thoại</TableCell>
                    <TableCell width="40%">Địa chỉ</TableCell>
                    <TableCell width="15%" align="right">
                      Thanh toán
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!saleOrders.length &&
                    saleOrders.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {dayjs(item.orderedAt).format(DEFAULT_DATE_FORMAT)}
                        </TableCell>
                        <TableCell>
                          {item.user.firstName + " " + item.user.lastName}
                        </TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.customerAddress}</TableCell>
                        <TableCell align="right">
                          {calculateTotalAmount(item.orderItems).toLocaleString(
                            "vn"
                          ) + "đ"}
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default RecentOrderManagement;
