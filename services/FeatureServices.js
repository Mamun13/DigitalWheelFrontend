import axios from "../utils/axios";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";

/**
 *
 * @returns {Promise<*>}
 */
export const fetchFeaturedProduct = async (params = {}) => {
    try {
        return await axios.get(`/ecom/inventories`, {
            params: params
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}




