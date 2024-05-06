import React from "react";
import {getStoragePath} from "../../utils/helpers";
import Link from "next/link";

const AddBanner = ({imagePath}) => {
	return (
		<>
			<section>
				<div className="container-fluid py-0">
					<div className="position-relative add_banner_overlay">
						<img src={imagePath ? getStoragePath(imagePath) : "/default-banner.jpg"} className="img-fluid mt-2 mb-2 small-banner" alt="..."/>
						<div className="position-absolute add_banner_link">
							<Link href="#" className="button-48 ms-2" role="button">
								<span className="text text-uppercase">shop now</span>
							</Link>
						</div>	
					</div>
				</div>
			</section>
		</>
	);
};

export default AddBanner;
