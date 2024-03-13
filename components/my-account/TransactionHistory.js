import React from "react";
import Row from "react-bootstrap/Row";

const TransactionHistory = () => {
  return (
    <>
      <Row>
        <h1 className="text-capitalize font-32 fw-bolder font-jost pb-4 text-light">
          Transaction History
        </h1>

        <div className="order-table table-responsive">
          <table className="table mb-5 ">
            <thead>
              <tr>
                <th scope="col" className="text-capitalize text-light">
                  ID
                </th>
                <th scope="col" className="text-capitalize text-light">
                  name/Business
                </th>
                <th scope="col" className="text-capitalize text-light">
                  date
                </th>
                <th scope="col" className="text-capitalize text-light">
                  amount
                </th>
                <th scope="col" className="text-capitalize text-light">
                  status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="align-items-center">
                <td scope="row" className="fw-bold text-light">
                  1
                </td>
                <td>
                  <p className="text-light">Md Azad</p>
                </td>
                <td>
                  <p className="text-light">20-sept-2023</p>
                </td>
                <td className="text-light">$250 USD</td>
                <td className="text-success text-capitalize ">deposit</td>
              </tr>
              <tr className="align-items-center">
                <td scope="row" className="fw-bold text-light">
                  2
                </td>
                <td>
                  <p className="text-light">Md Azad</p>
                </td>
                <td>
                  <p className="text-light">20-sept-2023</p>
                </td>
                <td className="text-light">$250 USD</td>
                <td className="text-warning text-capitalize">withdraw </td>
              </tr>
              <tr className="align-items-center">
                <td scope="row" className="fw-bold text-light">
                  3
                </td>
                <td>
                  <p className="text-light">Md Azad</p>
                </td>
                <td>
                  <p className="text-light">20-sept-2023</p>
                </td>
                <td className="text-light">$250 USD</td>
                <td className="text-success text-capitalize">deposit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Row>
    </>
  );
};

export default TransactionHistory;
