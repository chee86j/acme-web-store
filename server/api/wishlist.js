const express = require("express")
const app = express.Router()
const { User, Wishlist } = require("../db")

module.exports = app

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const wishlistData = { ...req.body, userId: user.id };
    const wishlist = await Wishlist.create(wishlistData);
    res.send(wishlist);
  } catch (error) {
    next(error);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.id !== req.params.id && !user.isAdmin) {
      res.sendStatus(401);
      return;
    }
    const wishlist = await user.getWishlistItems();
    res.send(wishlist);
  } catch (error) {
    next(error);
  }
});


app.delete("/:id", async (req, res, next) => {
    try {
      const user = await User.findByToken(req.headers.authorization)
      const wishlist = await Wishlist.findOne({
        where: {
          productId: req.params.id,
          userId: user.id
        }
      })
        if (wishlist.userId !== user.id && !user.isAdmin) {
            res.sendStatus(401)
            return
        }
      await wishlist.destroy()
      res.send(wishlist)
    } catch (error) {
        next(error)
    }
})
