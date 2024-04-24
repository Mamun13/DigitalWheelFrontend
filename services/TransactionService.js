import axios from "../utils/axios";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";

/**
 *
 * @returns {Promise<*>}
 */
export const fetchTransactions = async (params = {}) => {
    try {
        return await axios.get(`/ecom/all-transaction`, {
            params: params
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}




