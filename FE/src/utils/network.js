import axios from 'axios';
import { BASE_URL } from './environment'
import {getDataFromStorage} from "./cookies";


axios.interceptors.response.use(
    response => response.data
);

function network () {
    const baseUrl = BASE_URL
    const { token } = getDataFromStorage();
    const headers = {
        Authorization: `Bearer ${token}`
    };

    function setCredentials (_token) {
        headers.Authorization = `Bearer ${_token}`
    } 

    function* postData (action, body) {
        const url = baseUrl + action
        return yield axios.post(url, body, headers)
    }

    function* getData (action, params) {
        const url = baseUrl + action
        const config = { headers, params }
        return yield axios.get(url, config)
    }

    function* putData (action, body) {
        const url = baseUrl + action
        return yield axios.put(url, body, headers)
    }


    function* deleteData (action, body) {
        const url = baseUrl + action
        return yield axios.delete(url, body, headers)
    }

    return {
        setCredentials,
        postData,
        getData,
        putData,
        deleteData
    }
}

export default network()