import { useEffect, useState } from "react";
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
  Grid,
  Container,
} from "@material-ui/core";
import {
  Visibility as VisibilityIcon,
  Create as CreateIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useStyles } from "./make-style";
import {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
import { DEFAULT_PAGINATION_OPTION } from "@app/shared/constants/common";
import { SaleOrder } from "@app/models/sale-order.model";
import useForceUpdate from "@core/hooks/use-force-update.hook";
import useObservable from "@core/hooks/use-observable.hook";
import SaleOrderService from "@app/services/http/sale-order.service";
import Controls from "@app/components/controls";

function SaleOrderManagement() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const [total, setTotal] = useState(0);
  const [saleOrders, setSaleOrders] = useState<SaleOrder[]>([]);
  const [pagination, setPagination] = useState(() => {
    const options: PaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
    };
    return options;
  });

  useEffect(() => {
    subscribeUntilDestroy(
      SaleOrderService.getListForAdmin(pagination),
      (response: ResponseResult) => {
        setSaleOrders(response.data as SaleOrder[]);
        setTotal(response?.pagination?.total || 0);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, forceUpdate]);

  const openViewDialog = (item: SaleOrder) => {};
  const openInPopup = (item: SaleOrder) => {};

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
        Quản lý đơn hàng
      </Typography>
      <Box style={{ position: "relative" }}>
        {/* <PopupForm
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
        </PopupForm> */}
        <Box style={{ display: "flex" }}>
          <Box style={{ marginTop: "1em" }}>
            <TextField
              label="Search by Sale Order Id:"
              id="outlined-size-small"
              variant="outlined"
              size="small"
              // value={searchState}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              // onChange={handleSearchChange}
            />
          </Box>
          <Box style={{ marginLeft: "2em" }}>
            <Grid container>
              <Grid item style={{ width: "20em" }}>
                {/* <Controls.Select
                  name="deliveryId"
                  label="Filter by delivery"
                  value={deliverySelected}
                  options={deliveriesSelect}
                  onChange={handleSelectedDeliveryChange}
                /> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Paper style={{ marginTop: 10 }}>
        <TableContainer style={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Trạng thái giao hàng</TableCell>
                <TableCell width="7%" align="center">
                  Xem
                </TableCell>
                <TableCell width="7%" align="center">
                  Cập nhật
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!saleOrders.length &&
                saleOrders.map((item, index) => (
                  <TableRow key={index}>
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
          component="div"
          count={total}
          page={pagination.page - 1}
          rowsPerPage={pagination.perPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Container>
  );
}

export default SaleOrderManagement;
