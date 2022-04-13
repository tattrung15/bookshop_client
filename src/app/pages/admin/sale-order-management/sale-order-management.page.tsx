import { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";
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
import { GlobalState } from "@app/store";

function SaleOrderManagement() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { deliveries } = useSelector(selectDelivery);
  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const typingTimeoutRef = useRef<any>(null);

  const [total, setTotal] = useState(0);
  const [searchState, setSearchState] = useState(0);
  const [deliverySelected, setDeliverySelected] = useState(0);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    setSearchState(value);
    if (value > 0) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        subscribeOnce(
          SaleOrderService.getSaleOrderForAdmin(value),
          (data: SaleOrder) => {
            if (data && data.id) {
              setSaleOrders([data]);
              setTotal(1);
            } else {
              setSaleOrders([]);
              setTotal(0);
            }
          }
        );
      }, 500);
    } else if (value === 0) {
      setForceUpdate();
    } else {
      setSaleOrders([]);
      setTotal(0);
    }
  };

  const handleSelectedDeliveryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = +event.target.value;
    setDeliverySelected(value);
    if (value) {
      const options: PaginationOption = {
        ...pagination,
        equal: {
          delivery: value,
        },
      };
      setPagination(options);
      setSearchState(0);
    } else {
      const options: PaginationOption = {
        ...DEFAULT_PAGINATION_OPTION,
      };
      setPagination(options);
    }
  };

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
              label="Tìm kiếm theo mã đơn hàng"
              id="outlined-size-small"
              variant="outlined"
              size="small"
              value={searchState || ""}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
              }}
              onChange={handleSearchChange}
            />
          </Box>
          <Box style={{ marginLeft: "2em" }}>
            <Grid container>
              <Grid item style={{ width: "20em" }}>
                {!!deliveries.length && (
                  <Controls.Select
                    style={{ width: "12em" }}
                    name="deliveryId"
                    label="Lọc theo trạng thái"
                    value={deliverySelected}
                    options={[
                      { id: 0, title: "Tất cả" },
                      ...deliveries.map((delivery) => ({
                        id: delivery.id,
                        title: delivery.value,
                      })),
                    ]}
                    onChange={handleSelectedDeliveryChange}
                  />
                )}
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

const selectDelivery = (state: GlobalState) => state.delivery;

export default SaleOrderManagement;
