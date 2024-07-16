import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      // console.log(cartList)
      const amount = cartList.map(each => each.price * each.quantity)
      const totalAmount = amount.reduce((a, b) => a + b)
      console.log(totalAmount)
      return (
        <div className="cart-summary-container">
          <div className="cart-summary-container-ele">
            <h1 className="total-order">
              Order Total:{' '}
              <span className="total-amount">Rs {totalAmount}/-</span>
            </h1>
            <p className="no-of-items-in-cart">
              {cartList.length} items in cart
            </p>
            <button type="button" className="check-out-btn">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
