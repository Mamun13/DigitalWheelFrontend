import Row from "react-bootstrap/Row";
import {Fragment, useEffect, useState} from "react";
import {fetchTransactions} from "../../services/TransactionService";

import { useRouter } from "next/router";

const Deposit = ({transactionstatus}) => {
    const router = useRouter();
    const [transactions, setTransactions] = useState([]);

    const fetchTransactionsData = () => {
        fetchTransactions({
            paginate: 'yes'
        }).then((response) => {
            if (response?.data?.data) {
                setTransactions(response.data.data);
            }
        });
    }

    useEffect(() => {
        fetchTransactionsData();
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
           
            <Row>

                <h1 className="text-capitalize font-32 fw-bolder prosto_one_regular pb-4">
                    deposit
                </h1>
                <div className=" table-responsive">
                    <table className=" mb-5 table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" className="text-capitalize accordion">ID</th>
                            <th scope="col" className="text-capitalize accordion">Payment Type</th>
                            <th scope="col" className="text-capitalize accordion">Cash Person</th>
                            <th scope="col" className="text-capitalize accordion">Online Payment Mobile</th>
                            <th scope="col" className="text-capitalize accordion">Transaction ID</th>
                            <th scope="col" className="text-capitalize accordion">Bank Account</th>
                            <th scope="col" className="text-capitalize accordion">Payment Date</th>
                            <th scope="col" className="text-capitalize accordion">Payment Amount</th>
                            <th scope="col" className="text-capitalize accordion">wallet Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions &&
                            transactions.map((item, index) => (
                                <tr key={index}>
                                    <td className="order-list mt-3 text-capitalize">{item.id}</td>
                                    <td className="order-list mt-3 text-capitalize">{item.payment_type}</td>
                                    <td className="order-list mt-3 text-capitalize">{item.cash_person_name}</td>
                                    <td className="order-list mt-3 text-capitalize">{item.online_mobile}</td>
                                    <td className="order-list mt-3 text-capitalize">{item.online_transaction_number}</td>
                                    <td className="order-list mt-3 text-capitalize">{item.bank_account}</td>
                                    <td className="order-list mt-3 text-capitalize">{item.voucher_date}</td>
                                    <td className="order-list mt-3 text-capitalize">{item.payment_amount}</td>
                                    <td className="order-list mt-3 text-capitalize">{item.wallet_amount}</td>
                                    

                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Row>
        </Fragment>
    )
}
export default Deposit