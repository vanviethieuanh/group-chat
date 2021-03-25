import axios from 'axios'

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

const baseURL = `http://localhost:5000/`

export default {
    Public() {
        console.log(baseURL)
        return axios.create({
            baseURL: baseURL
        })
    }
}
