import React, { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Link, useLocation } from "react-router-dom"
import ReactPaginate from "react-paginate"
import Rating from "./ui/Rating"
import Socials from "./ui/Socials"
import { getAverageRating } from "../util"
import AddToCartButton from "./AddToCartButton"
import WishListButton from "./ui/WishListButton"
import { useParallax } from "react-scroll-parallax"
import { SearchIcon } from "lucide-react"
import { useWishlist } from "../hooks/useWishlist"
import { useProducts } from "../hooks/useProducts"

const PaginatedProducts = () => {
  const { products } = useSelector((state) => state.products);
  const { id } = useSelector((state) => state.auth);
  const { loadWishlist } = useWishlist();
  const { loadProducts } = useProducts();

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
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadWishlist(id);
  }, [id, loadWishlist]);

  if (!products) {
    return <div aria-live="polite" aria-busy="true" className="loading-container">Loading products...</div>
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div ref={ref}>
      <div className="flex flex-wrap justify-center gap-10" role="search" aria-label="Product filters">
        {/* Filter by category */}
        <div className="form-control">
          <label htmlFor="category-select" className="sr-only">Filter by category</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-80 xl:btn-xl btn-ghost join-item btn flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
            aria-label="Category filter"
          >
            <option value="">All Categories</option>
            <option value="Category1">Category 1</option>
            <option value="Category2">Category 2</option>
            {/* Add more options for your categories */}
          </select>
        </div>

        {/* Search input */}
        <div className="join" role="search">
          <div className="btn btn-square join-item" aria-hidden="true">
            <SearchIcon size={24} className="text-black" />
          </div>
          <label htmlFor="product-search" className="sr-only">Search products</label>
          <input
            id="product-search"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products"
            aria-label="Search products"
            className="xl:btn-xl btn-ghost join-item btn flex items-center border-2 border-secondary bg-base-300 text-2xl font-bold normal-case hover:bg-base-200"
          />
        </div>
      </div>

      {/* Display filtered products */}
      <section aria-label="Product listing">
        <Products currentProducts={currentProducts} />
      </section>

      {/* Pagination */}
      <nav aria-label="Pagination" className="pagination-container">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="join flex justify-center"
          activeClassName="join-item bg-base-200"
          pageClassName="btn-sm join-item text-lg"
          previousClassName="btn-sm join-item bg-base-300 hover:bg-base-200 flex items-center"
          nextClassName="btn-sm join-item bg-base-300 hover:bg-base-200 flex items-center"
          aria-label="Product pagination"
        />
      </nav>
    </div>
  )
}

export const Products = ({ currentProducts }) => {
  return (
    <div className="m-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
      {currentProducts.map((product) => {
        return (
          <article
            className="card glass card-compact w-full max-w-[16rem] sm:card-normal"
            key={uuidv4()}
          >
            <figure className="min-h-12">
              <img
                src={product.imageURL}
                alt={`Product image: ${product.name}`}
                className="mask-square aspect-square h-full w-full"
                loading="lazy"
              />
            </figure>
            <div className="card-body p-2">
              <Link 
                to={`/products/${product.id}`}
                aria-label={`View details for ${product.name}`}
              >
                <h2 className="text-lg font-bold min-h-full overflow-hidden hover:text-base-200">
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
                  <span className="badge badge-ghost" aria-label={`Price: ${product.price} dollars`}>
                    <span className="text-lg font-bold">$</span>
                    <span className="font-bold">{product.price}</span>
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-center p-3">
                <WishListButton product={product} />
                <AddToCartButton product={product} quantity={1} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default PaginatedProducts
