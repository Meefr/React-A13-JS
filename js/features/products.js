import { itemsElement } from "../shares/ui/dom-elements.js";

const productsSuccess = function (data) {
  itemsElement.html(
    data.products
      .map((item, index) => {
        return `
          <div class="col-12 col-sm-6 col-md-4">
            <div class="border rounded-2 cursor-pointer" data-id='${item.id}'>
               <img src=${item.images[0]} class="w-100 mb-2 img-btn" />
              <div class="px-2">
                <div class="">
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                </div>
                <div class="d-flex flex-nowrap align-items-center gap-1 px-3 py-2">
                  <i class="fa fa-star" style="color:#F7C600"></i>
                  <p class="m-0 bg-danger bg-opacity-50 p-1 rounded-2">${
                    item.rating
                  }</p>
                </div>
                <div class="d-flex justify-content-around align-items-center flex-nowrap gap-1 py-2">
                  <p class="m-0 fw-bold fs-3">$${item.price}</p>
                  
                  <button class="btn btn-primary btn-bg-danger add-btn" data-product='${JSON.stringify(
                    {
                      id: item.id,
                      title: item.title,
                      image: item.images[0],
                      price: item.price,
                      stock: item.stock,
                    }
                  )}'>Add To Chart</button>
                </div>
              </div>
            </div>
          </div>`;
      })
      .join("")
       
  );
};
export default productsSuccess;
