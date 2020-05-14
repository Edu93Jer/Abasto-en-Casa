import axios from 'axios'

const service = axios.create({
 baseURL: 'http://localhost:3000',
 withCredentials: true
})

const AUTH_SERVICE = {
 SIGNUP: async ( userData ) =>  {
  return await service.post( '/signup', userData )
 },

 LOGIN: async ( userData ) => {
  return await service.post( '/login', userData )
 },

 LOGINFB: async ( ) => {
  return await service.get( '/auth/facebook' )
 },

 LOGINGMAIL: async ( ) => {
  return await service.get( '/auth/google' )
 },

 CURRENTUSER: async ( ) => {
  return await service.get( '/currentUser' )
 },

 LOGOUT: async ( ) => {
  return await service.get( '/logout' )
 },
}

export default AUTH_SERVICE;