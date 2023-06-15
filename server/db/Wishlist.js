const { INTEGER, TEXT } = require("sequelize")
const conn = require("./conn")
const { UUID, UUIDV4, STRING } = conn.Sequelize

//productId and UserID should be unique index

const Wishlist = conn.define("wishlist", {
    productId: {
        type: UUID,
        allowNull: false,
        primaryKey: true,

    },
    userId: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
    },
})

module.exports = Wishlist
