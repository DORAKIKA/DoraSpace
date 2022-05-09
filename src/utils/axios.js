import axios from 'axios'
import Vue from 'vue'

const request = axios.create({
})

request.interceptors.response.use(
  response => {
    window.response = response
    if (response.status === 200 && response.data.code === 200) {
      return response.data
    }
    return Promise.reject(response)
  },
  error => {
    Vue.$message.error(
      error.response ? error.response.data.message : error.message
    )
    return error
  }
)

export default request
