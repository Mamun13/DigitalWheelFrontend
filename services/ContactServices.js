import axios from "../utils/axios";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";

/**
 *
 * @returns {Promise<*>}
 */
export const fetchContact = async (params = {}) => {
    try {
        return await axios.get(`/contacts`, {
            params: params
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}




