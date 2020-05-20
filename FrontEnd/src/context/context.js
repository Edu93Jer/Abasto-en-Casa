import React, { createContext, Component } from 'react'
import AUTH_SERVICE from '../services/auth'
import handleAsync from '../utils'
export const MyContext = createContext()

 export class ContextProvider extends Component {
 state={
  loggedUser: null,
  cart: [],
 }

 // {producto: 'papas', precio: 10}, {producto: 'cebollas', precio: 12}, {producto: 'papas', precio: 13}

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

setCart = ( cart ) => {
 this.setState({ cart })
 console.log(this.state.cart)
}

render() {
 const { loggedUser, cart } = this.state;
 const { logUser, logout, setCart } = this;
 return (
  <MyContext.Provider value={{ loggedUser, logUser, logout, cart, setCart }}>
   { this.props.children }
  </MyContext.Provider>
 )
}
}