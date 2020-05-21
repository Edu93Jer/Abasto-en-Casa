import axios from 'axios'

const service = axios.create({
 baseURL: 'https://pacific-stream-12212.herokuapp.com',
 withCredentials: true
})

const ORDER_SERVICE = {
 CREATE: async (data) => {
  return await service.post('/order/create', data)
 },

 ALL: async () => {
  return await service.get('/order/all')
 },

 ALL_USER: async () => {
  return await service.get('/order/all/myorders')
 },

 DETAIL: async (id) => {
  return await service.get(`/order/${id}`)
 },

 UPDATE: async ({ id, data }) => {
  return await service.patch(`/order/edit/${id}`, data)
 },

 DELETE: async (id) => {
  return await service.delete(`/order/${id}`)
 },
}

export default ORDER_SERVICE;