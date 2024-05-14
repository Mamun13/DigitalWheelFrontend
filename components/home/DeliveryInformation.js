import Container from "react-bootstrap/Container";
import {MdOutlineVerifiedUser} from "react-icons/md";
import {RiServiceLine} from "react-icons/ri";
import {BsTruck} from "react-icons/bs";
import {IoIosPricetags} from "react-icons/io";

const DeliveryInformation = () => {
	return (
			<section className="support pb-3">
				<Container>
					<div className="row">
						<div className="col-lg-3 col-md-3 col-sm-6">
							<div className="mt-3 support-div border rounded d-flex justify-content-center align-items-center">
								<div className="py-4 rounded">
									<MdOutlineVerifiedUser className="support-icons mnicons"/>
									<p className="text-capitalize text-center font-16 fw-semibold">
										100% percent secured
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6">
							<div className="mt-3 support-div border rounded d-flex justify-content-center align-items-center">
								<div className="p-3 rounded">
									<RiServiceLine className="support-icons"/>
									<p className="text-capitalize text-center font-16 fw-semibold">
										24 hours / 7days support
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 ">
							<div className="mt-3 support-div border rounded d-flex justify-content-center align-items-center">
								<div className="py-4 rounded">
									<BsTruck className="support-icons"/>
									<p className="text-capitalize text-center font-16 fw-semibold">
										On Time Delivery
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 ">
							<div className="mt-3 support-div border rounded d-flex justify-content-center align-items-center">
								<div className="py-4 rounded">
									<IoIosPricetags className="support-icons"/>
									<p className="text-capitalize text-center font-16 fw-semibold">
										best price guaranteed
									</p>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
	);
};

export default DeliveryInformation;