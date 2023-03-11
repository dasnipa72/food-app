import axios from "axios";

export default axios.create({
    baseURL: 'https://apimocha.com/',
    headers: {
        'Content-type': 'application/json'
    }
});