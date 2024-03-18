import React, { useState } from "react";
import { Container } from "react-bootstrap";
// import TabPanel from '@mui/lab/TabPanel';

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";


const LatestTopProduct = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between border-black border-bottom mb-4">
          <div>
            <p className="text-capitalize prosto_one_regular font-30">
              Latest arrival
            </p>
          </div>
          <div className="d-flex">
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="one" label="Item One" />
                <Tab value="two" label="Item Two" />
                <Tab value="three" label="Item Three" />
              
              </Tabs>
            </Box>
           
            
          </div>
        </div>
        <div></div>
      </Container>
    </>
  );
};

export default LatestTopProduct;
