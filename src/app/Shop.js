import { cart, categories, products } from "../cores/data";
import {
  cardContainer,
  cartBody,
  categoryBox,
  lgSearchBar,
  smallSearchBar,
} from "../cores/selectors";
import {
  countTotalBadge,
  emptyStage,
  observer,
  productNotFound,
  scrollObserver,
} from "./functions";
import {
  addToCartBtnHandler,
  btnChangesHandler,
  categoryBtnHandler,
  decreaseBtnHandler,
  deleteBtnHandler,
  increaseBtnHandler,
  searchBarHandler,
} from "./handlers";
import { categoryBtnRender, productCardRender } from "./rendering";

class Shop {
  render() {
    categoryBtnRender(categories);
    productCardRender(products);
  }

  listener() {
    document.addEventListener("DOMContentLoaded", btnChangesHandler);
    categoryBox.addEventListener("click", () => {
      if (event.target.classList.contains("category-btn")) {
        categoryBtnHandler();
      }
    });

    cardContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-to-cart-button")) {
        addToCartBtnHandler();
      }
    });

    cartBody.addEventListener("click", (event) => {
      if (event.target.classList.contains("cart-product-delete-button")) {
        deleteBtnHandler();
      } else if (event.target.classList.contains("increase-quantity")) {
        increaseBtnHandler();
      } else if (event.target.classList.contains("decrease-quantity")) {
        decreaseBtnHandler();
      }
    });

    smallSearchBar.addEventListener("keyup", searchBarHandler);
    lgSearchBar.addEventListener("keyup",searchBarHandler);

    window.addEventListener("scroll", scrollObserver);
  }

  init() {
    this.render();
    this.listener();
    observer;
    observer.observe(cartBody, { subtree: true, childList: true });
    countTotalBadge(cart);
    emptyStage(cart);
    productNotFound()
  }
}

export default Shop;
