import React, { useEffect } from "react";
import { HeartIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "../../hooks/useToast";
import { addWishlist, removeWishlist, getWishlist } from "../../store";

function WishListButton(product) {
  const { id } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  if (!wishlist) return null;
  const { notify } = useToast();
  const [isPending, setIsPending] = React.useState(false);
  const isSelected = wishlist.some(
    (item) => item.productId === product.product.id && item.userId === id
  );
  const onClick = () => {
    if (!id) return notify("You must be logged in to add to wishlist", "error");
    setIsPending(true);
    if (!isSelected) {
      dispatch(addWishlist({ productId: product.product.id, userId: id }))
        .then(() => {
          setIsPending(false);

        })
        .catch(() => {
          setIsPending(false);

          notify("Something went wrong", "error");
        });
    } else {
      dispatch(removeWishlist(product.product.id))
        .then(() => {
          setIsPending(false);

        })
        .catch(() => {
          setIsPending(false);
          notify("Something went wrong", "error");
        });
    }
  };
  return (
    <button
      className={`btn-sm btn-circle hover:bg-red-500 btn hover:scale-125 ${isSelected ? "bg-red-600" : "bg-gray-400"
        }`}
      onClick={() => onClick()}
    >
      <HeartIcon
        size={24}
        className={isPending ? "animate animate-spin" : ""}
      />
    </button>
  );
}

export default WishListButton;
