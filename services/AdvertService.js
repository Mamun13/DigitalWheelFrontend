import axios from "../utils/axios";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";

/**
 *
 * @returns {Promise<*>}
 */
export const fetchAdvertBanner = async (params = {}) => {
    try {
        return await axios.get(`/content-module/26`, {
            params: params
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}




