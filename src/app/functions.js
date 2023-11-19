import { cart, products } from "../cores/data";
import {
  app,
  cardContainer,
  cardSection,
  cartBody,
  cartTotalPrice,
  cartTotalQuantity,
  emptySvgTemplate,
  header,
  notFoundSvgTemplate,
  totalInBadge,
} from "../cores/selectors";
import { cartRender } from "./rendering";

export const emptyStage = (array) => {
  if (array.length == 0) {
    const cloneSvg = emptySvgTemplate.content.cloneNode(true);
    const svg = cloneSvg.querySelector("svg");

    cartBody.innerHTML = new XMLSerializer().serializeToString(svg);
  }
};


export const productNotFound = () => {
  const items = document.querySelectorAll('.product-card')
  if (items.length == 0) {
    const cloneSvg = notFoundSvgTemplate.content.cloneNode(true);
    const svg = cloneSvg.querySelector("svg");
    cardSection.classList.add('flex','justify-center','item-center')
    cardSection.innerHTML = new XMLSerializer().serializeToString(svg);
   d
  } else {
    cardSection.classList.remove('flex','justify-center','item-center')
  }
};

export const countTotalBadge = (cart) => {
  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalQty += item.quantity;
    totalPrice += item.totalAmount;
  });

  totalInBadge.innerText = totalQty;
  cartTotalQuantity.innerText = totalQty;
  cartTotalPrice.innerText = totalPrice.toFixed(2);
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

  if (scrollY > 400) {
    header.className = "fixed w-full top-0 bg-white z-20";
  } else {
    header.className = "";
  }
};
