import { cart, products } from "../cores/data";
import {
  app,
  cartBody,
  cartTotalQuantity,
  header,
  totalInBadge,
} from "../cores/selectors";
import { cartRender } from "./rendering";

export const emptyStage = (array) => {
  if (array.length == 0) {
    const img = new Image();
    img.className = "absolute top-0 bottom-0 my-auto";
    img.src = "./src/asset/empty-cart.png";
    cartBody.append(img);
  }
};

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

export const scrollObserver = () => {
  let scrollVal = scrollY;

  if (scrollY > 300) {
    header.className = "fixed w-full top-0 bg-white z-20";
  } else {
    header.className = "";
  }
};
