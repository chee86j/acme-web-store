const conn = require("./conn")
const { STRING, UUID, UUIDV4 } = conn.Sequelize
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { BOOLEAN, TEXT } = require("sequelize")
const JWT = process.env.JWT || "felix"

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: {
      args: true,
      msg: "Username already in use.",
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
    unique: {
      args: true,
      msg: "Email already in use.",
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  stripeId: {
    type: STRING,
  },
  avatar: {
    type: TEXT,
  }
})

User.prototype.createOrder = async function (data) {
  const cart = await this.getCart()
  const order = await conn.models.order.create(data);

  const orderItems = [];

  for(let item of cart.cartItems){
    const createLineItem = async ()=> {
      await conn.models.lineItem.create({productId: item.dataValues.productId, quantity: item.dataValues.quantity, orderId: order.id})
      const product = await conn.models.product.findByPk(item.product.id)
      await product.update({ quantity: product.quantity - item.quantity })
      await item.destroy();
    }
    orderItems.push(createLineItem());
  }
  await Promise.all(orderItems);
  return order;
}

User.prototype.getCart = async function () {
  let cart = await conn.models.cart.findOne({
    where: {
      userId: this.id,
    },
    include: [
      {
        model: conn.models.cartItem,
        include: [conn.models.product],
      },
    ],
  })
  if (!cart) {
    cart = await conn.models.cart.create({
      userId: this.id,
    })
  }
  return cart
}

User.prototype.getOrders = async function () {
  let orders = await conn.models.order.findAll({
    where: {
      userId: this.id,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  })
  return orders
}

User.prototype.getWishlistItems = async function () {
  let wishlist = await conn.models.wishlist.findAll({
    where: {
      userId: this.id,
    },
    include: [
      {
        model: conn.models.product,
      },
    ],
  })
  return wishlist
}

User.prototype.setAdmin = async function (bool) {
  this.isAdmin = bool
  await this.save()
  return this
}

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart()
  let cartItem = cart.cartItems.find((cartItem) => {
    return cartItem.productId === product.id
  })
  if (cartItem) {
    cartItem.quantity += quantity
    await cartItem.save()
  } else {
    await conn.models.cartItem.create({
      cartId: cart.id,
      productId: product.id,
      quantity,
    })
  }
  return this.getCart()
}

User.prototype.updateCartQuantity = async function ({ product, quantity }) {
  const cart = await this.getCart()
  let cartItem = cart.cartItems.find((cartItem) => {
    return cartItem.productId === product.product.id
  })
  cartItem.quantity = quantity
  await cartItem.save()
  return this.getCart()
}

User.prototype.removeFromCart = async function ({ product, quantity }) {
  const cart = await this.getCart()
  const cartItem = cart.cartItems.find((cartItem) => {
    return cartItem.id === product.id
  })
  cartItem.quantity = cartItem.quantity - quantity
  if (cartItem.quantity > 0) {
    await cartItem.save()
  } else {
    await cartItem.destroy()
  }
  return this.getCart()
}

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5)
  }
})

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, JWT)
    const user = await this.findByPk(id)
    if (user) {
      return user
    }
    throw "user not found"
  } catch (ex) {
    const error = new Error("bad credentials")
    error.status = 401
    throw error
  }
}

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT)
}

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  })
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT)
  }
  const error = new Error("bad credentials")
  error.status = 401
  throw error
}

// guest cart methods below - createGuestCart, addToGuestCart, getGuestCart
User.prototype.createGuestCart = async function () {
  const cart = await conn.models.cart.create({
    userId: null,
    isCart: true,
  })
  return cart
}

User.prototype.addToGuestCart = async function ({ product, quantity }) {
  let cart = await this.getGuestCart()
  if (!cart) {
    cart = await this.createGuestCart()
  }
  let lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id
  })
  if (lineItem) {
    lineItem.quantity += quantity
    await lineItem.save()
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      productId: product.id,
      quantity,
    })
  }
  return this.getGuestCart()
}

User.prototype.getGuestCart = async function () {
  const cart = await conn.models.cart.findOne({
    where: {
      userId: null,
      isCart: true,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  })
  return cart
}

module.exports = User
