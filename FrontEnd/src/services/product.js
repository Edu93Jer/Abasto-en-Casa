import axios from 'axios'

const service = axios.create({
 baseURL: 'http://localhost:3000',
 withCredentials: true
})

const PRODUCT_SERVICE = {
 CREATE: async ( ) =>  {
  return await service.post( '/product/create', )
 },

 ALL: async ( ) => {
  return await service.get( '/product/all', )
 },

 DETAIL: async ( ) => {
  return await service.get( '/product/:id', )
 },

 UPDATE: async ( ) => {
  return await service.patch( '/product/edit/:id', )
 },

 DELETE: async ( ) => {
  return await service.delete( '/product/:id', )
 },
}

export default PRODUCT_SERVICE;