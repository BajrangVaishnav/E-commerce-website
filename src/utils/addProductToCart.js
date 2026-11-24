import { toast } from "react-toastify";
import { addToCart } from "./mockStore";

export default function addProductToCart(productId, quantity = 1) {
  try {
    addToCart(productId, quantity);
    toast.success("Added to your tab cart.");
  } catch (error) {
    toast.error(error.message || "Could not add this item to your cart.");
    return;
  }
}
