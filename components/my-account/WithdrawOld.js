import React from "react";
import Row from "react-bootstrap/Row";

const Withdraw = () => {
  return (
    <>
      <Row>
        <h1 className="text-capitalize font-32 fw-bolder prosto_one_regular pb-4">
          Withdraw History
        </h1>

        <div className="order-table table-responsive">
          <table className="table mb-5 ">
            <thead>
              <tr>
                <th scope="col" className="text-capitalize">
                  ID
                </th>
                <th scope="col" className="text-capitalize">
                  name/Business
                </th>
                <th scope="col" className="text-capitalize">
                  date
                </th>
                <th scope="col" className="text-capitalize">
                  invoice id
                </th>
                <th scope="col" className="text-capitalize">
                  amount
                </th>
                <th scope="col" className="text-capitalize">
                  status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-items-center">
                <td scope="row" className="fw-bold">
                  1
                </td>
                <td>
                  <p className="">Md Azad</p>
                </td>
                <td>
                  <p className="">20-sept-2023</p>
                </td>
                <td className="">0123456789</td>
                <td className="">$250 USD</td>
                <td className="text-capitalize text-primary fw-bold">
                  withdraw
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Row>
    </>
  );
};

export default Withdraw;
