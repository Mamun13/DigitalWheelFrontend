import React, { useState, useEffect } from "react";
import HomePage from "./home";
import AgeVerification from "./AgeVerification.js";
// import VendorOverlay from "./vendorOverlay.js";
// import { isLoggedIn, logout } from "../utils/auth.js";

const Index = () => {
	// const [storedToken, setStoredToken] = useState();
	// const [reIsLoggedIn, setReIsLoggedIn] = useState(false);
	// const [customerType, setCustomerType] = useState(null);
  
	// useEffect(() => {
	//   if (isLoggedIn()) {
	// 	setReIsLoggedIn(isLoggedIn());
	//   }
	// }, []);
	
	// useEffect(() => {
	//   // Get the data from localStorage
	//   const localStorageData = localStorage.getItem("persist:root");
  
	//   if (localStorageData) {
	// 	// Parse the JSON string to an object
	// 	const parsedData = JSON.parse(localStorageData);
  
	// 	// Access the auth object and parse it if it exists
	// 	const authData = parsedData.auth ? JSON.parse(parsedData.auth) : null;
  
	// 	if (authData) {
	// 	  // Access and store the customer_type data
	// 	  const customerType = authData.customer_type;
	// 	  setCustomerType(customerType);
	// 	}
	//   }
	// }, []);
  
	return (
		<>
 {/* {customerType === "1" && (<VendorOverlay/>)} */}
			
			
			<AgeVerification/>
			<HomePage/>
		</>
	);
};

export default Index;
