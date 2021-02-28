import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";

export default function HomePage() {
  return (
    <>
      <Box marginTop={2} paddingX={5.5}>
        <Carousel />
      </Box>
    </>
  );
}
