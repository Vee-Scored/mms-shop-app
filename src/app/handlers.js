import { products } from "../cores/data";
import { cardContainer } from "../cores/selectors";
import { productCardRender } from "./rendering";

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
  const selectedProductId = event.target.closest('.product-card').getAttribute('product-card-id')
  
 
};

export const categoryBtnHandler = () => {
  cardContainer.innerHTML = "";
  const categoryVal = event.target.innerText;
  productCardRender(products, categoryVal);
};
