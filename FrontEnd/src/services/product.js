import axios from 'axios'

const service = axios.create({
 baseURL: 'http://localhost:3000',
 withCredentials: true
})

const PRODUCT_SERVICE = {
 CREATE: async ( data ) =>  {
  return await service.post( '/product/create', data )
 },

 ALL: async ( ) => {
  return await service.get( '/product/all', )
 },

 DETAIL: async ( id ) => {
  return await service.get( `/product/${id}` )
 },

 UPDATE: async ( { id , data } ) => {
  return await service.patch( `/product/edit/${id}`, data )
 },

 DELETE: async ( id ) => {
  return await service.delete( `/product/${id}` )
 },
}

export default PRODUCT_SERVICE;