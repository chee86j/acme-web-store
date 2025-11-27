import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsByCategory, setSelectedCategory } from "../store";

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, selectedCategory } = useSelector((state) => state.products);

  const loadProducts = useCallback(
    async (category) => {
      if (category) {
        return dispatch(fetchProductsByCategory(category)).unwrap();
      }
      return dispatch(fetchProducts()).unwrap();
    },
    [dispatch]
  );

  const selectCategory = useCallback(
    (category) => dispatch(setSelectedCategory(category)),
    [dispatch]
  );

  return {
    products,
    selectedCategory,
    loadProducts,
    selectCategory,
  };
};
