import { useDispatch, useSelector } from 'react-redux';
import { 
  addToCart, 
  addToGuestCart, 
  removeFromCart, 
  removeFromGuestCart,
  updateCartQuantity,
  updateGuestCartQuantity,
  fetchUserCart,
  fetchGuestCart 
} from '../store';
import { useToast } from './useToast';

/**
 * A custom hook to manage cart operations regardless of user login status
 * @returns {Object} Cart operations and state
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const { auth, cart } = useSelector(state => state);
  const { notify } = useToast();
  
  /**
   * Loads the appropriate cart based on user auth status
   * @returns {Promise} Cart loading operation
   */
  const loadCart = async () => {
    try {
      if (auth.id) {
        return await dispatch(fetchUserCart()).unwrap();
      } else {
        return await dispatch(fetchGuestCart()).unwrap();
      }
    } catch (err) {
      notify('Failed to load cart', 'error');
      return null;
    }
  };
  
  /**
   * Adds an item to the cart
   * @param {Object} product - The product to add
   * @param {number} quantity - The quantity to add
   * @param {boolean} showNotification - Whether to show a notification
   * @returns {Promise} Add operation
   */
  const addItem = async (product, quantity = 1, showNotification = true) => {
    try {
      const payload = { product, quantity };
      
      if (auth.id) {
        await dispatch(addToCart(payload)).unwrap();
      } else {
        await dispatch(addToGuestCart(payload)).unwrap();
      }
      
      if (showNotification) {
        notify('Added to cart', 'success');
      }
      
      return true;
    } catch (err) {
      notify('Failed to add item to cart', 'error');
      return false;
    }
  };
  
  /**
   * Updates the quantity of an item in the cart
   * @param {Object} product - The product to update
   * @param {number} quantity - The new quantity
   * @returns {Promise} Update operation
   */
  const updateQuantity = async (product, quantity) => {
    try {
      if (quantity <= 0) {
        return await removeItem(product);
      }
      
      if (auth.id) {
        await dispatch(updateCartQuantity({ product, quantity })).unwrap();
      } else {
        await dispatch(updateGuestCartQuantity({
          productId: product.product.id,
          quantity
        })).unwrap();
      }
      
      return true;
    } catch (err) {
      notify('Failed to update quantity', 'error');
      return false;
    }
  };
  
  /**
   * Removes an item from the cart
   * @param {Object} product - The product to remove
   * @returns {Promise} Remove operation
   */
  const removeItem = async (product) => {
    try {
      if (auth.id) {
        await dispatch(removeFromCart({ product })).unwrap();
      } else {
        await dispatch(removeFromGuestCart({ product: { product } })).unwrap();
      }
      
      notify('Item removed from cart', 'success');
      return true;
    } catch (err) {
      notify('Failed to remove item from cart', 'error');
      return false;
    }
  };
  
  return {
    cart,
    isAuthenticated: !!auth.id,
    loading: cart.loading,
    error: cart.error,
    loadCart,
    addItem,
    updateQuantity,
    removeItem
  };
};

export default useCart; 