import React, { useState, useEffect } from "react";

import { fetchSaleOrderByUserIdAndDelivery } from "../../api/orderItemService";

import { useRecoilState } from "recoil";
import { userSeletor } from "../../recoil/userState";

import SaleOrder from "../SaleOrder";

function StateDelivery(props) {
  const { state } = props || "ChoXacNhan";
  const { indexActiveStep } = props || 0;
  const { stateStep } = props;

  const [userState] = useRecoilState(userSeletor);

  const [saleOrders, setSaleOrders] = useState([]);

  useEffect(() => {
    fetchSaleOrderByUserIdAndDelivery(userState.userId, state)
      .then((data) => {
        setSaleOrders(data);
      })
      .catch((err) => {});
    return () => {
      setSaleOrders([]);
    };
  }, [state, userState.userId]);

  return (
    <>
      {saleOrders.length !== 0 &&
        saleOrders.map((item) => (
          <SaleOrder
            key={item.id}
            saleOrder={item}
            indexActiveStep={indexActiveStep}
            stateStep={stateStep}
          />
        ))}
    </>
  );
}

export default StateDelivery;
