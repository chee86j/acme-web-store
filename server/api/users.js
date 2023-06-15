const express = require("express")
const app = express.Router()
const {
  Cart,
  User,
  Order,
  Review,
  Product,
  LineItem,
  CartItem,
  Wishlist
} = require("../db")


module.exports = app

app.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (user.id !== req.params.id && !user.isAdmin) {
      res.sendStatus(401)
      return
    }
    const fetchedUser = await User.findByPk(req.params.id, {
      include: Order,
    })
    res.send(fetchedUser)
  } catch (ex) {
    next(ex)
  }
})

app.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin || user.id !== req.params.id) {
      res.sendStatus(401)
      return
    }
    const fetchedUser = await User.findByPk(req.params.id)
    const updateData = {
      username: req.body.data.username,
      email: req.body.data.email,
      avatar: req.body.data.avatar,
    }
    if (req.body.data.password !== "" && req.body.data.password !== undefined && req.body.data.password !== null) {
      updateData.password = req.body.data.password
    }
    const updatedUser = await fetchedUser.update(updateData)
    res.send(updatedUser)
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(403)
      res.send(error.errors[0].message)
    } else {
      next(error)
    }
  }
})

app.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    if (!user.isAdmin) {
      res.sendStatus(401)
      return
    }
    const users = await User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "createdAt",
        "isAdmin",
        "stripeId",
        "avatar",
      ],
      include: [
        {
          model: Order,
          include: [
            {
              model: LineItem,
              include: [Product],
            },
          ],
        },
        {
          model: Review,
          include: [Product],
        },
        {
          model: Cart,
          include: [
            {
              model: CartItem,
              include: [Product],
            },
          ],
        },
        {
          model: Wishlist,
          include: [Product],
        }
      ],
    })
    res.send(users)
  } catch (ex) {
    next(ex)
  }
})
