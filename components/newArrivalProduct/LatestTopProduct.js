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
        <div className="mb-4 float-right">
          <p className="text-capitalize prosto_one_regular font-30">
            Latest arrival
          </p>
        </div>
        <JustDemo />
      </Container>
    </>
  );
};

export default LatestTopProduct;
