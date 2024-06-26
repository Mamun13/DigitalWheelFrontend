import Row from "react-bootstrap/Row";
import { Fragment, useEffect, useState } from "react";
import { fetchOrders } from "../../services/OrderServices";
import {
  currency,
  getOrderStatusName,
  getPaymentStatusName,
} from "../../utils/helpers";
import Link from "next/link";
import { useRouter } from "next/router";

const OrdersTab = ({ orderStatus }) => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const fetchOrdersData = () => {
    fetchOrders({
      paginate: "yes",
    }).then((response) => {
      if (response?.data?.data) {
        setOrders(response.data.data);
        console.log(response.data.data);
      }
    });
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const [showStatus, setShowStatus] = useState(true);

  const handleCloseButtonClick = () => {
    setShowStatus(false);

    // Remove the order_status query parameter
    const { pathname, query } = router;
    delete query.order_status;

    // Push the updated query to the router
    router.push({
      pathname,
      query,
    });
  };

  return (
    <Fragment>
      {orderStatus && orderStatus === "success" && showStatus && (
        <div className="mb-4 text-success order-success-message">
          <h2>Thanks for placing your order.</h2>
          <button className="close" onClick={handleCloseButtonClick}>
            ×
          </button>
        </div>
      )}
      <Row>
        <h1 className="text-capitalize font-32 fw-bolder prosto_one_regular pb-4">
          Ordered Products
        </h1>
        <div className=" table-responsive  text-dark">
          <table className=" mb-5 table table-striped">
            <thead className="thead-light">
              <tr>
                <th scope="col" className="text-capitalize accordion">
                  ID
                </th>
                <th scope="col" className="text-capitalize accordion">
                  Order Date
                </th>
                <th scope="col" className="text-capitalize accordion">
                  Payment Status
                </th>
                <th scope="col" className="text-capitalize accordion">
                  Order Status
                </th>
                <th scope="col" className="text-capitalize accordion">
                  Grand Total
                </th>
                <th scope="col" className="text-capitalize accordion">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((item, index) => (
                  <tr key={index} >
                    <td className="order-list mt-3 text-capitalize">
                      {item.id}
                    </td>
                    <td>{item.order_date}</td>
                    <td>{getPaymentStatusName(item.payment_status_id)}</td>
                    <td>{getOrderStatusName(item.order_status_id)}</td>
                    <td>{currency(item.grand_total)}</td>
                    <td>
                      <Link
                        href={`/my-account/order/${item.id}/invoice`}
                        className="btn btn-danger btn-sm"
                      >
                        Invoice
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Row>
    </Fragment>
  );
};
export default OrdersTab;
