import { makePaymentInvoice } from "../../services/OrderServices";

const InvoiceCard = ({ orderDetails }) => {
  console.log(orderDetails);
  let billing_address = orderDetails.billing_address;
  let billing_lines = billing_address?.split(",");
  let shipping_address = orderDetails.shipping_address;
  let shipping_lines = shipping_address?.split(",");

  const handlePay = (event) => {
    event.preventDefault();

    makePaymentInvoice(orderDetails.id).then((response) => {
      // console.log(response);
      if (response?.data?.GatewayPageURL) {
        // tostify(toast, 'success', response);
        // dispatch(RESET_CART());
        window.location.href = response?.data?.GatewayPageURL;
      }
    });
  };

  return (
    <div className="">
      <div className="card-body">
        <div className="container mt-3">
          <div className="row d-flex justify-content-between">
            <div className="col-xl-3">
              <div
                className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                data-ripple-color="light"
              >
                <img
                  src="/logo/LOGO.png"
                  className="w-100 invoice_card"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xl-4">
              {/* <div className="d-flex justify-content-end mb-2 pay_now">
                {orderDetails.payment_status_id == 1 ? (
                  <button className="btn btn-outline-warning rounded-1 py-1 disabled ">
                    Paid
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-warning rounded-1 py-1"
                    onClick={(event) => handlePay(event)}
                  >
                    Pay now
                  </button>
                )}
              </div> */}
              <p className="fw-bold order_id">
                Order Id: #<span>{orderDetails?.id}</span>
              </p>
              <p className="fw-bold order_id">
                Date: <span>{orderDetails?.order_date}</span>
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-center border-top border-bottom mt-3">
            <div className="px-2 py-2 serial_number fw-bold"> Sl</div>
            <div className="px-2 py-2 items fw-bold"> Items</div>
            <div className="px-2 py-2 quantity fw-bold"> Qty</div>
            <div className="px-2 py-2 prices text-end fw-bold"> Price</div>
          </div>

          {orderDetails?.order_items?.map((item, index) => (
            <div className="d-flex justify-content-center">
              <div className="px-2 py-2 serial_number">{index + 1}</div>
              {item.type === "product" ? (
                <>
                  <div className="px-2 py-2 items">
                    {item?.inventory?.title}
                  </div>
                  <div className="px-2 py-2 quantity">{item?.quantity}</div>
                  <div className="px-2 py-2 prices text-end">
                    {" "}
                    {item?.unit_price * item?.quantity || 1}/-
                  </div>
                </>
              ) : (
                <>
                  <div className="px-2 py-2 items">{item?.combo?.title}</div>
                  <div className="px-2 py-2 quantity">{item?.quantity}</div>
                  <div className="px-2 py-2 prices text-end">
                    {" "}
                    {item?.unit_price * item?.quantity || 1}/-
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="d-flex justify-content-end border-top border-bottom">
            <div className="px-2 py-2 text-end text-capitalize fw-bold">
              {" "}
              sub-total: {orderDetails?.sub_total}/-
            </div>
          </div>

          <div className="row mb-3 mt-4">
            <div className="col-xl-6">
              <div className="payment-info my-2">
                <h4 className="fw-bold">Payment Information</h4>
                {/* <p className="payment">
                    {orderDetails?.payment_method?.code}
                  </p> */}
                <p className="desc">{orderDetails?.payment_method?.name}</p>
              </div>
              <hr />
              <div className="handle-info">
                <h4 className="fw-bold mt-2">
                  Shipping & Handling Information
                </h4>
                <p className="delivery-info">
                  Regular Delivery in 3-5 working Days.
                </p>
              </div>
            </div>
            <div className="col-xl-6 mb-3">
              <p className="fw-bold">Order Totals</p>
              <ul className="list-unstyled">
                <li className="text-muted ms-3 d-flex justify-content-between">
                  <span className="text-black me-4">SubTotal</span>
                  <span>{orderDetails?.sub_total}/-</span>
                </li>
                {/* {orderDetails?.discount && (
                  <li className="text-muted ms-3 d-flex justify-content-between">
                    <span className="text-black me-4">
                      Discount
                      {orderDetails?.coupon_code
                        ? ` (${orderDetails?.coupon_code})`
                        : ""}
                    </span>
                    <span>{orderDetails?.discount}/-</span>
                  </li>
                )} */}
                <li className="text-muted ms-3 d-flex justify-content-between">
                  <span className="text-black me-4">Shipping & Handling</span>{" "}
                  <span>{orderDetails?.shipping_charge}/-</span>
                </li>
                <hr />
                <li className="text-muted ms-3 d-flex justify-content-between font-bold">
                  <span className="text-black me-4">Grand Total</span>{" "}
                  <span>{orderDetails?.grand_total}/-</span>
                </li>
              </ul>
            </div>
            <hr />
          </div>

          <div className="row mt-4">
            <div className="col-xl-12 bg-light p-3 mr-20">
              <p className="fw-bold ">Billing Address</p>
              {/* {billing_lines?.map((line, i) => (
                  <p key={i} className="ms-3">
                    {line}
                  </p>
                ))} */}
              {billing_address}
              <p className="mt-4 fw-bold">Shipping Address</p>
              {shipping_address}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-xl-12">
              <p className="fw-bold mt-3">Contact with us</p>
              6th floor, 220/1 Taltola, west kafrul, Begum Rokeya Shoroni.
              Dhaka-1216
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
