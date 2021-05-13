import React, { useEffect, useState } from "react";

import { Box, Grid } from "@material-ui/core";

import Controls from "../controls/Controls";

import { Form } from "../../components/Popup/UseForm";

export default function EditSaleOrderForm(props) {
  const { recordForEdit, deliveries, handleEditItem } = props;

  const listItemDeliveries = deliveries.map((item) => {
    let delivery = {};
    delivery.id = item.id;
    delivery.title = item.value;
    return delivery;
  });

  const [saleOrder, setSaleOrder] = useState(null);
  const [saleOrderDelivery, setSaleOrderDelivery] = useState({
    saleOrderId: 0,
    deliveryId: 0,
  });

  useEffect(() => {
    setSaleOrder(recordForEdit);
    setSaleOrderDelivery({
      ...saleOrderDelivery,
      saleOrderId: recordForEdit.saleOrderId,
      deliveryId: recordForEdit.delivery.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordForEdit]);

  const handleSelectedChange = (e) => {
    setSaleOrderDelivery({
      ...saleOrderDelivery,
      saleOrderId: recordForEdit.saleOrderId,
      deliveryId: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditItem(saleOrderDelivery);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          {saleOrder && (
            <Box style={{ textAlign: "center" }}>
              <Controls.Input
                name="saleOrderId"
                label="Sale Order ID"
                value={saleOrder.saleOrderId}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={6}>
          {saleOrder && (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Controls.Select
                style={{ textAlign: "left" }}
                name="deliveryId"
                label="Delivery"
                value={saleOrder.delivery.id}
                options={listItemDeliveries}
                onChange={handleSelectedChange}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <div style={{ textAlign: "center" }}>
            <Controls.Button type="submit" text="Submit" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
