import axios from 'axios';
import { BASE_URL } from './environment'

axios.interceptors.response.use(
    response => response.data
);

function network (token) {
    const baseUrl = BASE_URL
    let headers = {}

    function setCredentials (token) {
        headers.Authorization = `Bearer ${token}`
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