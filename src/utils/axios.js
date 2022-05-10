import axios from 'axios'
import Vue from 'vue'

const request = axios.create({
})

request.interceptors.response.use(
  response => {
    window.response = response
    return Promise.resolve(response)
  },
  error => {
    Vue.$message.error(
      error.response ? error.response.data.message : error.message
    )
    return error
  }
)

export default request
