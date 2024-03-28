import React, { useState } from "react";
import { Container } from "react-bootstrap";
// import TabPanel from '@mui/lab/TabPanel';

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import JustDemo from "./JustDemo";

const LatestTopProduct = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container>
       
        <JustDemo />
      </Container>
    </>
  );
};

export default LatestTopProduct;
