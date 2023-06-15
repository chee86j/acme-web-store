const conn = require("./conn")
const User = require("./User")
const Product = require("./Product")
const Order = require("./Order")
const LineItem = require("./LineItem")
const Cart = require("./Cart")
const CartItem = require("./CartItem")
const Review = require("./Review")
const Wishlist = require("./Wishlist")
const { faker, fa } = require("@faker-js/faker")
const { avatarImage, avatarImage2 } = require("../images")

Order.belongsTo(User)
Order.hasMany(LineItem)
LineItem.belongsTo(Order)
LineItem.belongsTo(Product)
Product.hasMany(LineItem)
Product.hasMany(CartItem)
Product.hasMany(Review)
Product.hasMany(Wishlist)
User.hasOne(Cart)
User.hasMany(Order)
User.hasMany(Review)
User.hasMany(Wishlist)
Cart.belongsTo(User)
Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)
CartItem.belongsTo(Product)
Review.belongsTo(Product)
Review.belongsTo(User)
Wishlist.belongsTo(User)
Wishlist.belongsTo(Product)



const TOTAL_PRODUCTS = 200

getRandomCategory = () => {
  const categories = ["Category1", "Category2"]
  return categories[Math.floor(Math.random() * categories.length)]
}

const createFakeProduct = () => {
  return {
    name: faker.commerce.productName(),
    imageURL: faker.image.url({
      height: 400,
      width: 400,
    }),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    material: faker.commerce.productMaterial(),
    category: getRandomCategory(),
    quantity: faker.number.int({
      max: 499,
    }),
  }
}

const createFakeReview = (userId, productId) => {
  return {
    description: faker.lorem.paragraph(),
    rating: faker.number.int({
      min: 1,
      max: 5,
    }),
    userId: userId,
    productId: productId,
  }
}

const createFakeOrder = (userId) => {
  return {
    userId: userId,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.street(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
  }
}

const createFakeWishlistItem = (userId, productId) => {
  return {
    userId: userId,
    productId: productId,
  };
};


const createFakeLineItem = (orderId, productId) => {
  return {
    quantity: Math.floor(Math.random() * 1000),
    orderId: orderId,
    productId: productId,
  }
}

const createFakeCart = (userId) => {
  return {
    userId: userId,
  }
}

const createFakeCartItem = (cartId, productId) => {
  return {
    quantity: Math.floor(Math.random() * 1000),
    cartId: cartId,
    productId: productId,
  }
}

const addCartAndOrders = async () => {
  const users = await User.findAll({ attributes: ["id"] })
  let orders = []
  let carts = []
  for (let user of users) {
    const o = faker.helpers.multiple(
      () => createFakeOrder(user.dataValues.id),
      {
        count: 2,
      }
    )
    orders.push(...o)
    const c = faker.helpers.multiple(() => createFakeCart(user.dataValues.id), {
      count: 1,
    })
    carts.push(...c)
  }
  await Promise.all(orders.map((order) => Order.create(order)))
  await Promise.all(carts.map((cart) => Cart.create(cart)))
}

const addItemsToCart = async () => {
  const products = await Product.findAll({ attributes: ["id"] })
  const carts = await Cart.findAll({ attributes: ["id"] })
  let items = []
  for (let cart of carts) {
    const i = faker.helpers.multiple(
      () =>
        createFakeCartItem(
          cart.dataValues.id,
          faker.helpers.arrayElement(products).dataValues.id
        ),
      { count: 2 }
    )
    items.push(...i)
  }
  await Promise.all(items.map((itm) => CartItem.create(itm)))
}

const addItemsToOrder = async () => {
  const products = await Product.findAll({ attributes: ["id"] })
  const orders = await Order.findAll({ attributes: ["id"] })
  let items = []
  for (let order of orders) {
    const i = faker.helpers.multiple(
      () =>
        createFakeLineItem(
          order.dataValues.id,
          faker.helpers.arrayElement(products).dataValues.id
        ),
      {
        count: 2,
      }
    )
    i.map((itm) => {
      items.push(itm)
    })
  }
  await Promise.all(items.map((itm) => LineItem.create(itm)))
}

const addReviewsToProducts = async () => {
  const products = await Product.findAll({ attributes: ["id"] })
  const users = await User.findAll({ attributes: ["id"] })

  let reviews = [];

  for(let product of products){
    const r = faker.helpers.multiple(
      () =>
        createFakeReview(
          faker.helpers.arrayElement(users).dataValues.id,
          product.dataValues.id
        ),
      {
        count: 2,
      }
    )
    r.map((itm) => {
      reviews.push(itm)
    })
  }

  await Promise.all(reviews.map((rvw) => Review.create(rvw)))

}

const addWishlistItems = async () => {
  const products = await Product.findAll({ attributes: ["id"] });
  const users = await User.findAll({ attributes: ["id"] });
  let wishlistItems = [];
  for (let user of users) {
    const i = faker.helpers.multiple(
      () =>
        createFakeWishlistItem(
          user.dataValues.id,
          faker.helpers.arrayElement(products).dataValues.id
        ),
      { count: 2 }
    );
    wishlistItems.push(...i);
  }
  await Promise.all(wishlistItems.map((itm) => Wishlist.create(itm)));
};

const seedProducts = async () => {
  const fakeProducts = faker.helpers.multiple(createFakeProduct, {
    count: TOTAL_PRODUCTS,
  });
  await Promise.all(fakeProducts.map((product) => Product.create(product)));
};

const seedUsers = async () => {
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: "moe",
      password: "123",
      email: "seed1@test.com",
      isAdmin: true,
      stripeId: "cus_O2a2nOTbV2IKx8",
      avatar: avatarImage,
    }),
    User.create({
      username: "lucy",
      password: "123",
      email: "seed2@test.com",
      stripeId: "cus_O2aA5XZxwpruPF",
      avatar: avatarImage2,
    }),
    User.create({
      username: "dudedude",
      password: "123",
      email: "seed5@test.com",
      stripeId: "cus_O2aBih6vn7wbEa",
      avatar: avatarImage,
    }),
    User.create({
      username: "larry",
      password: "123",
      email: "seed3@test.com",
      stripeId: "cus_O2aBxuGDPfPlD2",
      avatar: avatarImage2,
    }),
    User.create({
      username: "ethyl",
      password: "123",
      email: "seed4@test.com",
      stripeId: "cus_O2aCVXnQzwXMri",
      avatar: avatarImage,
    }),
  ]);
  await Order.create({
    email: "test123@gmail.com",
    firstName: "test",
    lastName: "testing",
    street: "test st",
    city: "test town",
    state: "Oregon",
    zip: "12345",
    userId: moe.id,
  });
  await addCartAndOrders();
  await addItemsToCart();
  await addItemsToOrder();
  await addReviewsToProducts();
  await addWishlistItems();
};

const seed = async () => {
  await seedProducts()
  await seedUsers()
}

const syncAndSeed = async () => {
  await conn.sync({ force: true })
  await seed()
}

module.exports = {
  syncAndSeed,
  User,
  Product,
  Order,
  LineItem,
  Review,
  Cart,
  CartItem,
  Wishlist
}
