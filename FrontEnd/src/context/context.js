import React, { createContext, Component } from 'react'
import AUTH_SERVICE from '../services/auth'
import handleAsync from '../utils'
export const MyContext = createContext()

 export class ContextProvider extends Component {
 state={
  loggedUser: null,
  // rol: '',
 }

async componentDidMount() {
 const response = await handleAsync(AUTH_SERVICE.CURRENTUSER);
 this.logUser( response.user )
}

logUser = ( user ) => {
 this.setState({ loggedUser: user})
 // this.setState({ loggedUser: user, rol: user.rol })
}

logout = async () => {
 await AUTH_SERVICE.LOGOUT();
 this.setState({ loggedUser: null })
}

render() {
 const { loggedUser } = this.state;
 // const { loggedUser, rol } = this.state;
 const { logUser, logout } = this;
 return (
  <MyContext.Provider value={{ loggedUser, logUser, logout }}>
  {/* <MyContext.Provider value={{ loggedUser, rol, logUser, logout }}> */}
   { this.props.children }
  </MyContext.Provider>
 )
}
}