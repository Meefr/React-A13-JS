import handelRemoteRequest from "../../shares/api.js";

let itemId;
const moviePage = $("#movie-page");

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  itemId = urlParams.get("id");
  console.log(itemId);

  handelRemoteRequest(
    `products/${itemId}`,
    (data) => movieSuccess(data),
    (err) => {
      moviePage.html(`
                <div class="d-flex vh-100 justify-content-center align-items-center">
                    <div class="alert alert-danger">${err.message}</div>
                </div>
            `);
    },
    () => {
      moviePage.html(`
                <div class="d-flex vh-100 justify-content-center align-items-center">
                    <h3>Loading...</h3>
                </div>
            `);
    }
  );
});

const loadImgs = (images) => {
  return images
    .map((image, index) => {
      return `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img src="${image}" class="d-block w-100" alt="Product Image">
            </div>
        `;
    })
    .join("");
};

const loadReviews = (reviews) => {
  return reviews
    .map((review) => {
      return `
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${review.reviewerName}</div>
                    <p>${review.comment}</p>
                </div>
                <span class="badge text-bg-primary rounded-pill">${review.rating}★</span>
            </li>
        `;
    })
    .join("");
};

const movieSuccess = (data) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    thumbnail,
    images,
  } = data;

  const discountedPrice = (price * (1 - discountPercentage / 100)).toFixed(2);

  moviePage.html(`
        <div class="col-12 col-md-4 d-flex flex-column justify-content-center">
            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner" id="movie-imgs">
                    ${loadImgs(images)}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="col-12 col-md-8 d-flex justify-content-center flex-column gap-1">
            <h1>${title}</h1>
            <p>${description}</p>
            <div class="d-flex gap-1 mb-3 align-items-center gap-5">
                <div class="d-flex justify-content-between align-items-center gap-0">
                    <span>★</span>
                    <div class="px-2 bg-danger bg-opacity-75 rounded-2">${rating}</div>
                </div>
                <div class="d-flex justify-content-between align-items-center gap-2">
                    <p class="fw-bold mb-0 fs-3">$${discountedPrice} <small class="text-muted"><del>$${price}</del> (${discountPercentage}% off)</small></p>
                    <button class="btn btn-primary" data-product='${JSON.stringify(
                      data
                    )}'>Add To Cart</button>
                </div>
            </div>
            <p><strong>Brand:</strong> ${brand}</p>
            <p><strong>SKU:</strong> ${sku}</p>
            <p><strong>Weight:</strong> ${weight}g</p>
            <p><strong>Dimensions:</strong> ${dimensions.width} x ${
    dimensions.height
  } x ${dimensions.depth} cm</p>
            <p><strong>Warranty Information:</strong> ${warrantyInformation}</p>
            <p><strong>Shipping Information:</strong> ${shippingInformation}</p>
            <p><strong>Availability Status:</strong> ${availabilityStatus}</p>
            <p><strong>Return Policy:</strong> ${returnPolicy}</p>
            <p><strong>Tags:</strong> ${tags.join(", ")}</p>
            <div>
                <h3>Reviews</h3>
                <ol class="list-group list-group-numbered">
                    ${loadReviews(reviews)}
                </ol>
            </div>
        </div>
    `);
};
