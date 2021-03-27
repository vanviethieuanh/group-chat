import axios from 'axios'

const baseURL = `http://localhost:5000/`

export default {
    Public() {
        console.log(baseURL)
        return axios.create({
            baseURL: baseURL
        })
    }
}
