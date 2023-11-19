import { cart, products } from "../cores/data";
import {
  cardContainer,
  cartBody,
  cartProductTemplate,
  categoryBox,
  categoryTemplate,
  productCardTemplate,
  starTemplate,
} from "../cores/selectors";
import { addedButton } from "./functions";
import { addToCartBtnHandler, categoryBtnHandler } from "./handlers";

export const createStar = (rate) => {
  let starUi = document.createElement("div");
  starUi.classList.add("flex");
  for (let i = 1; i <= 5; i++) {
    let starClone = starTemplate.content.cloneNode(true);
    let starSvg = starClone.querySelector("svg");
    let intRate = Math.round(rate);
    if (i <= intRate) {
      starSvg.classList.add("stroke-orange-400", "fill-orange-400");
    }
    starUi.append(starSvg);
  }
  let star = new XMLSerializer().serializeToString(starUi);
  return star;
};

export const createCategoryBtn = (content) => {
  let clone = categoryTemplate.content.cloneNode(true);
  let cloneBtn = clone.querySelector(".category-btn");
  cloneBtn.innerText = content;
  return cloneBtn;
};

export const categoryBtnRender = (categoryArray) => {
  categoryArray.forEach((el) => {
    categoryBox.append(createCategoryBtn(el));
  });
};

export const createProductCards = ({
  id,
  title,
  price,
  description,
  image,
  rating: { rate, count },
}) => {
  let clone = productCardTemplate.content.cloneNode(true);
  const cloneProductCard = clone.querySelector(".product-card");
  const productImg = cloneProductCard.querySelector(".product-card-image");
  const productTitle = cloneProductCard.querySelector(".product-card-title");
  const productDescription = cloneProductCard.querySelector(
    ".product-card-description"
  );
  const productPrice = cloneProductCard.querySelector(".product-card-price");
  const addToCartBtn = cloneProductCard.querySelector(".add-to-cart-button");
  const productRatingStar = cloneProductCard.querySelector(
    ".product-card-rating-star"
  );
  const productCardRatingRate = cloneProductCard.querySelector(
    ".product-card-rating-rate"
  );
  const productCardRatingCount = cloneProductCard.querySelector(
    ".product-card-rating-count"
  );

  cloneProductCard.setAttribute("product-card-id", id);
  productImg.src = image;
  productTitle.innerText = title;
  productDescription.innerText = description;
  productPrice.innerText = price;
  productRatingStar.innerHTML = createStar(rate);
  productCardRatingCount.innerText = count;
  productCardRatingRate.innerText = Math.round(rate);

  const isExistedInCart = cartBody.querySelector(`[cart-product-id = '${id}']`);

  if (isExistedInCart) {
    addedButton(addToCartBtn);
  }

  return cloneProductCard;
};


export let currentCategory = "All"
export const productCardRender = (productArray, category = "All") => {
  cardContainer.innerHTML =""
  const filteredArray = productArray.filter(
    (product) => product.category == category
  );

  if (category == "All") {
    productArray.forEach(
      ({ id, title, image, price, description, rating: { rate, count } }) => {
        cardContainer.append(
          createProductCards({
            id,
            title,
            image,
            price,
            description,
            rating: { rate, count },
          })
        );
      }
    );
  } else {
    filteredArray.forEach(
      ({ id, title, price, description, image, rating: { rate, count } }) => {
        cardContainer.append(
          createProductCards({
            id,
            title,
            price,
            description,
            image,
            rating: { rate, count },
          })
        );
      }
    );
  }

  currentCategory = category;
};

export const createCartProduct = ({
  id,
  title,
  price,
  quantity,
  image,
  totalAmount = price,
}) => {
  const clone = cartProductTemplate.content.cloneNode(true);
  const cartProduct = clone.querySelector(".cart-product-card");
  const cartProductImage = cartProduct.querySelector(".cart-product-image");
  const cartProductTitle = cartProduct.querySelector(".cart-product-title");
  const cartProductPrice = cartProduct.querySelector(".cart-product-price");
  const cartProductQuantity = cartProduct.querySelector(
    ".cart-product-quantity"
  );

  cartProduct.setAttribute("cart-product-id", id);
  cartProductImage.src = image;
  cartProductTitle.innerText = title;
  cartProductQuantity.innerText = quantity;
  cartProductPrice.innerText = totalAmount.toFixed(2);

  return cartProduct;
};

export const cartRender = (cartArray) => {
  cartBody.innerHTML = "";
  cartArray.forEach(({ id, title, price, quantity, image, totalAmount }) => {
    cartBody.append(
      createCartProduct({ id, title, price, quantity, image, totalAmount })
    );
  });
};

// test

// export const productCardRender = (productArray, category = "All", searchInput = "") => {
//   const filteredArray = productArray.filter((product) => {
//     // Check if the product matches the category and contains the search input in the title or description
//     return (
//       (category === "All" || product.category === category) &&
//       (product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchInput.toLowerCase()))
//     );
//   });

//   // Assuming you have a container to append the cards, replace "cardContainer" with your actual container reference
//   //const cardContainer = document.getElementById("cardContainer");

//   // Clear existing cards before rendering
//   cardContainer.innerHTML = "";

//   if (filteredArray.length === 0) {
//     console.log("No matching products found.");
//   } else {
//     filteredArray.forEach(({ id, title, price, description, image, rating: { rate, count } }) => {
//       cardContainer.append(
//         createProductCards({
//           id,
//           title,
//           price,
//           description,
//           image,
//           rating: { rate, count },
//         })
//       );
//     });
//   }
// };
