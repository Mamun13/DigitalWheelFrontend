import React,{useState, useEffect} from "react";
import {getStoragePath} from "../../utils/helpers";
import Link from "next/link";
import {fetchAdvertBanner} from "../../services/AdvertService"

const AddBanner = ({imagePath}) => {
	const [advertBanner, setAdvertBanner] = useState([]);

    useEffect(() => {
        fetchAdvertBanner().then((res) => {
            setAdvertBanner(res?.data[0]?.content_item);
        });
    }, []);


	return (
		<>
			<section className="add_with_btn">
				<div className="container-fluid py-0">
					<div className="position-relative add_banner_overlay">
						<img src={imagePath ? getStoragePath(imagePath) : "/default-banner.jpg"} className="img-fluid mt-2 mb-2 small-banner" alt="..."/>
						<div className="position-absolute add_banner_link">
							 
							
						<h3 className="text-center font-24 pb-2 text-capitalize prosto_one_regular add_banner_link_res">{advertBanner[1]?.item_name}</h3>
							<div className="d-flex justify-content-center">
								{advertBanner[1]?.item_link && (
									<Link href={advertBanner[1].item_link} className="button-48 ms-2" role="button">
										<span className="text-uppercase add_banner_link_btn">shop now</span>
									</Link>
								)}
							</div>
						</div>	
					</div>
				</div>
			</section>
		</>
	);
};

export default AddBanner;
