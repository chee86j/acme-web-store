import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, getWishlist, removeWishlist } from "../store";
import { useToast } from "./useToast";

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.products);
  const { notify } = useToast();

  const loadWishlist = useCallback(
    async (userId) => {
      if (!userId) return [];
      try {
        return await dispatch(getWishlist(userId)).unwrap();
      } catch (error) {
        notify("Unable to load wishlist", "error");
        return [];
      }
    },
    [dispatch, notify]
  );

  const toggleWishlist = useCallback(
    async ({ productId, userId, isSelected }) => {
      if (!userId) {
        notify("You must be logged in to add to wishlist", "error");
        return false;
      }

      try {
        if (isSelected) {
          await dispatch(removeWishlist(productId)).unwrap();
        } else {
          await dispatch(addWishlist({ productId, userId })).unwrap();
        }
        return true;
      } catch (error) {
        notify("Something went wrong", "error");
        return false;
      }
    },
    [dispatch, notify]
  );

  return {
    wishlist,
    loadWishlist,
    toggleWishlist,
  };
};
