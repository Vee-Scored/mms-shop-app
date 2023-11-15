import { cart, products } from "../cores/data";
import { cardContainer } from "../cores/selectors";
import { addedButton } from "./functions";
import { cartRender, productCardRender } from "./rendering";

export const btnChangesHandler = () => {
  const btns = document.querySelectorAll(".category-btn");

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      btns.forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active", "duration-300");
    });
  });
};

export const addToCartBtnHandler = () => {
  const currentBtn = event.target;
  const selectedProduct = event.target.closest(".product-card");
  const selectedProductId = selectedProduct.getAttribute("product-card-id");
  const cartProduct = products.filter(
    (product) => product.id == selectedProductId
  );

  const clickedItem = products.find((el) => el.id == selectedProductId);
  console.log(cartProduct);

  cartProduct[0].quantity = 1;
  cartProduct[0].totalAmount = clickedItem.price;
  cartProduct.forEach((el) => {
    cart.push(el);
  });
  cartRender(cart);
  addedButton(currentBtn);
};

export const categoryBtnHandler = () => {
  cardContainer.innerHTML = "";
  const categoryVal = event.target.innerText;
  productCardRender(products, categoryVal);
};

export const deleteBtnHandler = () => {
  const currentId = event.target
    .closest(".cart-product-card")
    .getAttribute("cart-product-id");
  const indexToRemove = cart.findIndex((el) => el.id == currentId);
  cart.splice(indexToRemove, 1);
  cartRender(cart);
};

export const increaseBtnHandler = () => {
  const currentId = event.target
    .closest(".cart-product-card")
    .getAttribute("cart-product-id");
  const objToIncrease = cart.find((el) => el.id == currentId);
  const objInProduct = products.find((el) => el.id == currentId);
  objToIncrease.quantity += 1;
  objToIncrease.totalAmount += objToIncrease.price;
  console.log(objToIncrease.totalAmount);
  cartRender(cart);
  console.log(objToIncrease);
};

export const decreaseBtnHandler = () => {
  const currentId = event.target
    .closest(".cart-product-card")
    .getAttribute("cart-product-id");
  const objToDecrease = cart.find((el) => el.id == currentId);
  if (objToDecrease.quantity !== 1) {
    objToDecrease.quantity -= 1;
    objToDecrease.totalAmount -= objToDecrease.price;
  } else {
    return;
  }
  cartRender(cart);
};
