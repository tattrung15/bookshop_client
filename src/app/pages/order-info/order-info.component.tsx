import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { NavLink, useLocation } from "react-router-dom";
import {
  DEFAULT_PAGINATION_OPTION,
  DELIVERY_STATE,
  DELIVERY_STATE_MAP,
} from "@app/shared/constants/common";
import { useStyles } from "./make-style";
import { SaleOrder } from "@app/models/sale-order.model";
import useObservable from "@core/hooks/use-observable.hook";
import SaleOrderService, {
  SaleOrderPaginationOption,
} from "@app/services/http/sale-order.service";
import OrderItem from "@app/components/order-item";

const handleLinkActiving = (stateFromLink: string, stateFromQuery: string) => {
  if (stateFromLink === stateFromQuery) {
    return {
      fontWeight: "bold",
      color: "red",
    };
  }
  return {};
};

function OrderInfo() {
  const classes = useStyles();

  const location = useLocation();
  const { subscribeUntilDestroy } = useObservable();
  const query = new URLSearchParams(location.search);

  const [numberOfPage, setNumberOfPage] = useState(0);
  const [saleOrders, setSaleOrders] = useState<SaleOrder[]>([]);
  const [pagination, setPagination] = useState(() => {
    const options: SaleOrderPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
    };
    return options;
  });

  useEffect(() => {
    const state = query.get("state") || DELIVERY_STATE.WAITING_TO_CONFIRM;
    const options: SaleOrderPaginationOption = {
      ...pagination,
      deliveryIndex: DELIVERY_STATE_MAP[state],
    };
    subscribeUntilDestroy(
      SaleOrderService.getListForMember(options),
      (response) => {
        const data = response.data as SaleOrder[];
        const total = response.pagination?.total || 0;
        const perPage = response.pagination?.perPage || 1;
        setSaleOrders(data);
        setNumberOfPage(Math.ceil(total / perPage));
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, query.get("state")]);

  const onPageChange = (event: React.ChangeEvent<any>, page: number) => {
    const options: SaleOrderPaginationOption = {
      ...pagination,
      page,
    };
    setPagination(options);
  };

  return (
    <Box className={classes.wrapper}>
      <Typography color="textPrimary" className={classes.title}>
        Thông tin đơn hàng
      </Typography>
      <Divider style={{ margin: "0.5em auto" }} />
      <Box>
        <ul className={classes.listNavLink}>
          <li>
            <NavLink
              className={classes.navLink}
              to={`/profile/order?state=${DELIVERY_STATE.WAITING_TO_CONFIRM}`}
              style={() =>
                handleLinkActiving(
                  DELIVERY_STATE.WAITING_TO_CONFIRM,
                  query.get("state") ?? DELIVERY_STATE.WAITING_TO_CONFIRM
                )
              }
            >
              Chờ xác nhận
            </NavLink>
          </li>
          <li>
            <NavLink
              className={classes.navLink}
              to={`/profile/order?state=${DELIVERY_STATE.DELIVERING}`}
              style={() =>
                handleLinkActiving(
                  DELIVERY_STATE.DELIVERING,
                  query.get("state") ?? ""
                )
              }
            >
              Đang giao hàng
            </NavLink>
          </li>
          <li>
            <NavLink
              className={classes.navLink}
              to={`/profile/order?state=${DELIVERY_STATE.DELIVERED}`}
              style={() =>
                handleLinkActiving(
                  DELIVERY_STATE.DELIVERED,
                  query.get("state") ?? ""
                )
              }
            >
              Đã giao
            </NavLink>
          </li>
          <li>
            <NavLink
              className={classes.navLink}
              to={`/profile/order?state=${DELIVERY_STATE.CANCELED}`}
              style={() =>
                handleLinkActiving(
                  DELIVERY_STATE.CANCELED,
                  query.get("state") ?? ""
                )
              }
            >
              Đã hủy
            </NavLink>
          </li>
        </ul>
      </Box>
      {!!saleOrders.length &&
        saleOrders.map((item, index) => <OrderItem item={item} key={index} />)}
      {!!saleOrders.length && (
        <Box marginTop={5}>
          <Pagination
            count={numberOfPage}
            onChange={onPageChange}
            page={pagination.page}
            color="primary"
            style={{ justifyContent: "center", display: "flex" }}
          />
        </Box>
      )}
    </Box>
  );
}

export default OrderInfo;
