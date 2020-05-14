import axios from 'axios'

const service = axios.create({
 baseURL: 'http://localhost:3000',
 withCredentials: true
})

const PROFILE_SERVICE = {

 PROFILE: async ( ) => {
  return await service.get( '/profile', )
 },

 UPDATE: async ( ) => {
  return await service.patch( '/product/edit', )
 },

 DELETE: async ( ) => {
  return await service.delete( '/product/delete', )
 },
}

export default PROFILE_SERVICE;