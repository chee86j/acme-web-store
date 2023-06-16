import React, { useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Link, useLocation } from "react-router-dom"
import ReactPaginate from "react-paginate"
import Rating from "./ui/Rating"
import Socials from "./ui/Socials"
import { getAverageRating } from "../util"
import AddToCartButton from "./AddToCartButton"
import WishListButton from "./ui/WishListButton"
import { useParallax } from "react-scroll-parallax"
import { fetchProducts, getWishlist } from "../store"

const PaginatedProducts = () => {
  const { products, wishlist } = useSelector((state) => state.products);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnProductsPage, setIsOnProductsPage] = useState(false); // Determine if we are on the products page

  // Pagination variables
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const { ref } = useParallax({ speed: 50 })

  const location = useLocation();

  useEffect(() => {
    dispatch(getWishlist(id))
  }, [])

  if (!products) {
    return <>Loading...</>
  }

  // Hook to listen for changes in the url to determine if we are on the products page
  useEffect(() => {
    setIsOnProductsPage(location.pathname === "/products");
  }, [location]);

  // Filter products based on search query and selected category
  // useMemo is used to prevent the filterProducts array from being recalculated on every render
  const filterProducts = useMemo(() => {
    if (!isOnProductsPage) {
      return products;
    }
    return products.filter(
      (product) =>
        (selectedCategory === "" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, selectedCategory, searchQuery, isOnProductsPage]);

  // Set the item offset when the search query or selected category changes
  useEffect(() => {
    setItemOffset(0);
  }, [searchQuery, selectedCategory]);

  const currentProducts = filterProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };

  return (
    <div ref={ref}>
      <div className="flex flex-wrap justify-center gap-10">
        {/* Filter by category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-80 xl:btn-xl btn-ghost join-item btn mt-6 flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
        >
          <option value="">All Categories</option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
          {/* Add more options for your categories */}
        </select>

        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="xl:btn-xl btn-ghost join-item btn mt-6 flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
        />
      </div>

      {/* Display filtered products */}
      <Products currentProducts={currentProducts} wishlist={wishlist} />

      {/* Pagination */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="join flex justify-center"
        activeClassName="btn-sm join-item bg-accent"
        pageClassName="btn-sm join-item"
        previousClassName="btn-sm join-item bg-primary"
        nextClassName="btn-sm join-item bg-primary"
      />
    </div>
  )
}

export const Products = ({ currentProducts, wishlist }) => {
  return (
    <div className="m-4 flex flex-shrink flex-wrap justify-center">
      {currentProducts.map((product) => {
        return (
          <div
            className="card glass card-compact m-4 w-64 sm:card-normal"
            key={uuidv4()}
          >
            <figure className="min-h-12">
              <img
                src={product.imageURL}
                alt={product.name}
                className="mask-square aspect-square h-full w-full"
              />
            </figure>
            <div className="card-body p-2">
              <Link to={`/products/${product.id}`}>
                <h2 className="text-lg font-bold min-h-full hover:text-base-200">
                  {product.name}
                </h2>
              </Link>
            </div>
            <div className="card-actions flex flex-col">
              <div className="flex w-full flex-row">
                <div className="flex-none px-2">
                  <Rating rating={getAverageRating(product.reviews)} />
                </div>
                <div className="grow"></div>
                <div className="flex-none px-2">
                  <span className="badge badge-ghost">
                    <span className="text-lg font-bold">$</span>
                    <span className="font-bold">{product.price}</span>
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-center p-3">
                <WishListButton product={product} wishlist={wishlist} />
                <AddToCartButton product={product} quantity={1} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaginatedProducts
