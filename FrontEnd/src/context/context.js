import React, { createContext, Component } from 'react'
import AUTH_SERVICE from '../services/auth'
import handleAsync from '../utils'
export const MyContext = createContext()

 export class ContextProvider extends Component {
 state={
  loggedUser: null,
  cart: [],
 }

async componentDidMount() {
 const response = await handleAsync(AUTH_SERVICE.CURRENTUSER);
 this.logUser( response.user )
}

logUser = ( user ) => {
 this.setState({ loggedUser: user})
}

logout = async () => {
 await AUTH_SERVICE.LOGOUT();
 this.setState({ loggedUser: null })
}

render() {
 const { loggedUser } = this.state;
 const { logUser, logout } = this;
 return (
  <MyContext.Provider value={{ loggedUser, logUser, logout }}>
   { this.props.children }
  </MyContext.Provider>
 )
}
}