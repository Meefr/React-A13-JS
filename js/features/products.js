import { itemsElement } from "../shares/ui/dom-elements.js";

const productsSuccess = function (data) {
  itemsElement.html(
    data.products
      .map((item, index) => {
        return `
          <div class="col-4">
            <div class="border shadow rounded-2 px-1 py-2">
              <img src=${
                item.images[0]
              } class="w-100 mb-2" style="height: 200px" />
              <div class="mb-3">
                <h3 class="mb-1">${item.title}</h3>
                <p>${item.description}</p>
              </div>
              <div class="d-flex gap-1 mb-3 align-items-center">
                <span>★</span>
                <div class="px-2 bg-danger bg-opacity-75 rounded-2">${
                  item.rating
                }</div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="fw-bold mb-0 fs-3">$${item.price}</p>
                <button class="btn btn-primary" data-product='${JSON.stringify({
                  id: item.id,
                  title: item.title,
                  image: item.images[0],
                  price: item.price,
                  stock: item.stock,
                })}'>Add To Chart</button>
              </div>
            </div>
          </div>`;
      })
      .join("")
  );
};
export default productsSuccess;
