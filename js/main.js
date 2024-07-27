import CartManager from "./features/cart/cartManager.js";
import categoriesSuccess from "./features/categories.js";
import productsSuccess from "./features/products.js";
import handelRemoteRequest, { getManyRequsets } from "./shares/api.js";
import {
  loadingElement,
  errorElement,
  mainElement,
  catgoriesContainer,
  itemsElement,
  cartList,
} from "./shares/ui/dom-elements.js";

const requestsConfig = [
  {
    endpoint: "products/categories",
    success: (data) => categoriesSuccess(data),
  },
  {
    endpoint: "products",
    success: (data) => productsSuccess(data),
  },
];

getManyRequsets(
  {
    startLoading: () => {
      loadingElement.removeClass("d-none");
      loadingElement.addClass("d-flex");
    },
    error: (err) => {
      errorElement.removeClass("d-none");
      errorElement.addClass("d-flex");
      mainElement.removeClass("row");
      mainElement.addClass("d-none");
      errorElement.find(".alert").text(err.message);
    },
    stopLoading: () => {
      loadingElement.removeClass("d-flex");
      loadingElement.addClass("d-none");
    },
  },
  requestsConfig
).then(() => handelGetProductsByCategory());

//get products by category
// click on li => request by id value

function handelGetProductsByCategory() {
  catgoriesContainer.children().on("click", (e) => {
    handelRemoteRequest(
      `products/category/${e.target.id}`,

      (data) => productsSuccess(data),

      (err) => {
        itemsElement.html(`<div
        class="d-flex vh-100 justify-content-center align-items-center"
      >
        <div class="alert alert-danger">${err.message}</div>
      </div>`);
      },

      () => {
        itemsElement.html(`<div
          class="d-flex vh-100 justify-content-center align-items-center"
        >
          <h3>Loading...<h3>
        </div>`);
      }
    );
  });
}

//chart

const cartManager = new CartManager();

itemsElement.on("click", (e) => {
  if ($(e.target).attr("data-product")) {
    if ($(e.target).hasClass("add-btn")) {
      // console.log(JSON.parse($(e.target).attr("data-product")));
      let cartitem = JSON.parse($(e.target).attr("data-product"));
      cartManager.addToCart(cartitem);
    }
  }
  if ($(e.target).hasClass("img-btn")) {
    const itemId = $(e.target).attr("data-id");
    window.location.href = `..//..//..//html/movie.html?id=${itemId}`;
  }
});
