export const cartTotal = (cartArr) => {
  let total = 0
  if (!cartArr) return total
  if (cartArr.length > 0) {
    for (let item of cartArr) {
      total += parseInt(item.product.price) * item.quantity
    }
  }
  // to convert to USD
  const formattedTotal = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })

  return formattedTotal
}

export const cartQuantity = (cartArr) => {
  let quantity = 0
  if (!cartArr) return quantity
  if (cartArr.length > 0) {
    for (let item of cartArr) {
      quantity += item.quantity
    }
  }
  return quantity
}

export const getAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => {
    return acc + review.rating
  }, 0)
  return Math.floor(sum / reviews.length)
}

export const emailValidator = (email) => {
  if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return true
  }
  return false
}

export const passwordValidator = (password) => {
  if (password.match(/^[A-Za-z]\w{7,14}$/)) {
    return true
  }
  return false
}

export const usernameValidator = (username) => {
  if (username.match(/^[A-Za-z][A-Za-z0-9_]{7,29}$/)) {
    return true
  }
  return false
}
