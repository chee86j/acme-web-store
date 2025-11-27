import React from "react";
import { HeartIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useWishlist } from "../../hooks/useWishlist";

function WishListButton({ product }) {
  const { id } = useSelector((state) => state.auth);
  const { wishlist, toggleWishlist } = useWishlist();
  const [isPending, setIsPending] = React.useState(false);

  if (!wishlist) return null;

  const isSelected = wishlist.some(
    (item) => item.productId === product.id && item.userId === id
  );

  const onClick = async () => {
    setIsPending(true);
    await toggleWishlist({ productId: product.id, userId: id, isSelected });
    setIsPending(false);
  };

  return (
    <button
      className={`btn-sm btn-circle hover:bg-red-500 btn hover:scale-125 ${
        isSelected ? "bg-red-600" : "bg-gray-400"
      }`}
      onClick={onClick}
    >
      <HeartIcon
        size={24}
        className={isPending ? "animate animate-spin" : ""}
      />
    </button>
  );
}

export default WishListButton;
