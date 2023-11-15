import { cart, products } from "../cores/data";
import { app, cartTotalQuantity, totalInBadge } from "../cores/selectors";
import { cartRender } from "./rendering";

export const countTotalBadge = (cart) => {
  let totalQty = 0;

  cart.forEach((item) => {
    totalQty += item.quantity;
  });

  totalInBadge.innerText = totalQty;
  cartTotalQuantity.innerText = totalQty;
};

export const observer = new MutationObserver(() => {
  countTotalBadge(cart);
});

export const addedButton = (btn) => {
  btn.classList.add("bg-gray-800", "text-white");
  btn.disabled = true;
  btn.innerText = "Added";
};
