import axios from 'axios'

const service = axios.create({
 baseURL: 'http://localhost:3000',
 withCredentials: true
})

const ORDER_SERVICE = {
 CREATE: async ( data) =>  {
  return await service.post( '/order/create', data)
 },

 ALL: async ( ) => {
  return await service.get( '/order/all', )
 },

 DETAIL: async ( ) => {
  return await service.get( '/order/:id', )
 },

 UPDATE: async ( ) => {
  return await service.patch( '/order/edit/:id', )
 },

 DELETE: async ( ) => {
  return await service.delete( '/order/:id', )
 },
}

export default ORDER_SERVICE;