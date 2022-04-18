import { Box, Divider, Typography } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";
import { DELIVERY_STATE } from "@app/shared/constants/common";
import { useStyles } from "./make-style";

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
  const query = new URLSearchParams(location.search);

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
                  query.get("state") ?? ""
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
    </Box>
  );
}

export default OrderInfo;
