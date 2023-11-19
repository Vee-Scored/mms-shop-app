import Swal from "sweetalert2";
import { cart, products } from "../cores/data";
import { app, cardContainer, cartBody, cartIcon } from "../cores/selectors";
import { addedButton, emptyStage, productNotFound } from "./functions";
import { cartRender, currentCategory, productCardRender } from "./rendering";

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

  cartProduct[0].quantity = 1;
  cartProduct[0].totalAmount = clickedItem.price;
  cartProduct.forEach((el) => {
    cart.push(el);
  });
  cartRender(cart);
  addedButton(currentBtn);

  // for image animation
  const currentImage = selectedProduct.querySelector("img");
  const currentImageSrc = currentImage.src;
  const cloneImg = new Image();
  cloneImg.src = currentImageSrc;
  cloneImg.id = "clone";

  const currentImageRect = currentImage.getBoundingClientRect();
  const cartIconRect = cartIcon.getBoundingClientRect();
  cloneImg.classList.add("fixed", "w-20", "z-40");

  cloneImg.style.left = currentImageRect.left + 120 + "px";
  cloneImg.style.top = currentImageRect.top + 70 + "px";

  const keyframe = [
    { transform: "rotate(0)" },
    {
      left: cartIconRect.left + 3 + "px",
      top: cartIconRect.top + 3 + "px",
      width: 20 + "px",
      rotate: "2turn",
    },
  ];

  console.log(cartIconRect.top);
  const option = {
    duration: 500,
    iterations: 1,
  };

  const animation = cloneImg.animate(keyframe, option);
  animation.addEventListener("finish", () => {
    app.querySelector("#clone").remove();
  });
  app.append(cloneImg);
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

  Swal.fire({
    title: "Sure to delete?",
    text: "Item will be cleared!",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    customClass: {
      cancelButton: "!ring-0",
      popup: "w-80",
      title: "custom-swal-title",
      confirmButton: "!bg-gray-800 text-white !ring-0",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const currentItemInCart = cartBody.querySelector(
        `[cart-product-id = '${currentId}']`
      );
      currentItemInCart.classList.add("animate__animated", "animate__hinge");
      currentItemInCart.addEventListener("animationend", () => {
        const indexToRemove = cart.findIndex((el) => el.id == currentId);
        cart.splice(indexToRemove, 1);

        cartRender(cart);
        emptyStage(cart);
      });

      let addToCartBtn = cardContainer.querySelectorAll(".add-to-cart-button");

      addToCartBtn.forEach((btn) => {
        if (btn.disabled == true) {
          btn.classList.remove("bg-gray-800", "text-white");
          btn.disabled = false;
          btn.innerText = "Add to cart";
        }
      });
    }
  });
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

export const searchBarHandler = (event) => {
    let typeValue = event.target.value;
    console.log(typeValue)

    let filteredArray = products.filter(el => {
      return  (el.title.toLowerCase().trim().search(typeValue.toLowerCase().trim()) !== -1 || el.description.toLowerCase().trim().search(typeValue.toLowerCase().trim()) !== -1)
    })
    if (filteredArray.length !== -1) {
    productCardRender(filteredArray,currentCategory)
    } else {
      productCardRender(products)
    }

    productNotFound()
};
