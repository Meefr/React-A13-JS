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

let cartManager;


let loadHTML = (file, elementId) => {
  return fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Error loading HTML:", error));
};

let multiLoads = async () => {
  await Promise.all([
    // loadHTML("navbar.html", "nav-bar"),
    loadHTML(".//html/cart.html", "cart-element"),
  ]);
};

multiLoads()
  .then(() => {
    cartManager = new CartManager();
  })
  .catch((error) => {
    console.error("Error initializing CartManager:", error);
  });

itemsElement.on("click", (e) => {
  e.preventDefault(); // Prevent default action

  const target = $(e.target);
  if (target.hasClass("add-btn")) {
    const cartitem = JSON.parse(target.attr("data-product"));
    cartManager.addToCart(cartitem);
  } else if (target.closest("[data-id]").length > 0) {
    const itemId = target.closest("[data-id]").attr("data-id");
    window.location.href = `html/movie.html?id=${itemId}`;
  }
});

// let loadHTML = (file, elementId) => {
//   fetch(file)
//   .then((response) => response.text())
//   .then((data) => {
//       document.getElementById(elementId).innerHTML = data;
//     })
//     .catch((error) => console.error("Error loading HTML:", error));
//   };
//   let multiloads = () => {
//     loadHTML('../html/navbar.html','nav-bar');
//     loadHTML("../html/cart.html", "cart-container");
//     cartManager = new CartManager()
// }
// multiloads();