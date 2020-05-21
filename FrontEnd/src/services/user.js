import axios from 'axios'

const service = axios.create({
 baseURL: 'https://pacific-stream-12212.herokuapp.com',
 withCredentials: true
})

const PROFILE_SERVICE = {

 CREATEMESSAGE: async (data) => {
  return await service.post('/mailbox', data)
 },

 PROFILE: async () => {
  return await service.get('/profile')
 },

 UPDATE: async (data) => {
  return await service.patch('/profile/edit', data)
 },

 DELETE: async () => {
  return await service.delete('/profile/delete')
 },
}

export default PROFILE_SERVICE;