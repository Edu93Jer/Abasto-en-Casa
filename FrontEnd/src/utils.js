const handleAsync = async asyncFn => {
 let result
 try {
   const { data } = await asyncFn()
   result = data
 } catch (e) {
   const { data } = e.response
   result = data
 }
 return result
}

export default handleAsync
