import axios from 'axios'
import { API_BASE_URL } from '@/consts/api'

const network = axios.create({
  baseURL: API_BASE_URL
})

export default network
