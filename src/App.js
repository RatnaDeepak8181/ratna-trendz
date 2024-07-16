import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItemInList = updatedData => {
    const updatedCartData = updatedData.filter(
      eachItem => eachItem.quantity > 0,
    )
    this.setState({cartList: updatedCartData})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartData = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity > 0) {
          const updatedQuantity = each.quantity - 1
          return {...each, quantity: updatedQuantity}
        }
      }
      return each
    })
    this.setState({cartList: updatedCartData})
    this.removeCartItemInList(updatedCartData)
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartData = cartList.map(each => {
      if (each.id === id) {
        const updatedQuantity = each.quantity + 1
        return {...each, quantity: updatedQuantity}
      }
      return each
    })
    this.setState({cartList: updatedCartData})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isRepeated = cartList.find(eachItem => eachItem.id === product.id)
    if (isRepeated) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === product.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(each => each.id !== id)
    this.setState({
      cartList: filteredCartList,
    })
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
