import axios from "../utils/axios";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";

/**
 *
 * @returns {Promise<*>}
 */
export const fetchfaqs = async (params = {}) => {
    try {
        return await axios.get(`/content-module/30`, {
            params: params
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}




