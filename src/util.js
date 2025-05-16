export const cartTotal = (cartArr) => {
  if (!cartArr || !Array.isArray(cartArr) || cartArr.length === 0) return '$0.00'
  
  const total = cartArr.reduce((sum, item) => {
    const price = Number(item.product.price) || 0
    const quantity = Number(item.quantity) || 0
    return sum + (price * quantity)
  }, 0)
  
  // to convert to USD
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total)
}

export const cartQuantity = (cartArr) => {
  if (!cartArr || !Array.isArray(cartArr) || cartArr.length === 0) return 0
  
  return cartArr.reduce((quantity, item) => {
    return quantity + (Number(item.quantity) || 0)
  }, 0)
}

export const getAverageRating = (reviews) => {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0
  
  const sum = reviews.reduce((acc, review) => acc + Number(review.rating || 0), 0)
  return Math.floor(sum / reviews.length)
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(price) || 0)
}

export const emailValidator = (email) => {
  if (!email || typeof email !== 'string') return false
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const passwordValidator = (password) => {
  if (!password || typeof password !== 'string') return false
  return /^[A-Za-z]\w{7,14}$/.test(password)
}

export const usernameValidator = (username) => {
  if (!username || typeof username !== 'string') return false
  return /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(username)
}
