import axios from 'axios'

const service = axios.create({
 baseURL: 'http://localhost:3000',
 withCredentials: true
})

const PROFILE_SERVICE = {

 PROFILE: async ( ) => {
  return await service.get( '/profile', )
 },

 UPDATE: async ( data ) => {
  return await service.patch( '/profile/edit', data )
 },

 DELETE: async ( ) => {
  return await service.delete( '/profile/delete', )
 },
}

export default PROFILE_SERVICE;