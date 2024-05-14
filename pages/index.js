import {Fragment} from "react";
import HomePage from "./home";
import AgeVerification from "./AgeVerification.js";

const Index = () => {
	return (
		<Fragment>
			<AgeVerification/>
			<HomePage/>
		</Fragment>
	);
};

export default Index;
