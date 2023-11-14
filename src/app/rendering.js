import {
  cardContainer,
  categoryBox,
  categoryTemplate,
  productCardTemplate,
  starTemplate,
} from "../cores/selectors";
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
  const productCardRatingRate = cloneProductCard.querySelector('.product-card-rating-rate')
  const productCardRatingCount = cloneProductCard.querySelector('.product-card-rating-count')


  cloneProductCard.setAttribute("product-card-id", id);
  productImg.src = image;
  productTitle.innerText = title;
  productDescription.innerText = description;
  productPrice.innerText = price;
  productRatingStar.innerHTML = createStar(rate);
  productCardRatingCount.innerText = count;
  productCardRatingRate.innerText = Math.round(rate)

  addToCartBtn.addEventListener("click", addToCartBtnHandler);

  return cloneProductCard;
};

export const productCardRender = (productArray, category = "All") => {
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
    
    console.log('category:','All')
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

 
  console.log('clicked2')
};
