import { categories, products } from "../cores/data";
import { cardContainer, categoryBox } from "../cores/selectors";
import { addToCartBtnHandler, btnChangesHandler, categoryBtnHandler } from "./handlers";
import { categoryBtnRender, productCardRender } from "./rendering";

class Shop {
  render() {
    categoryBtnRender(categories);
    productCardRender(products);
  }

  listener() {
    document.addEventListener("DOMContentLoaded", btnChangesHandler);
    categoryBox.addEventListener('click',()=>{
      if (event.target.classList.contains('category-btn')) {
        categoryBtnHandler()
      }
    })
    cardContainer.addEventListener('click',(event)=>{
      if (event.target.classList.contains('add-to-cart-button')) {
        addToCartBtnHandler()
      }
    })
  }

  init() {
    this.render();
    this.listener();
  }
}

export default Shop;
