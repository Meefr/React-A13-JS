export default class CartItem {
  constructor(cartItem, quantaty = 1) {
    this.id = cartItem.id;
    this.title = cartItem.title;
    this.price = cartItem.price;
    this.image = cartItem.image;
    this.quantaty = quantaty;
    this.stock = cartItem.stock;
    this.total = 0;
    this.calculateTotal();
  }
  calculateTotal = function () {
    this.total = (Number(this.price) * Number(this.quantaty)).toFixed(2);
  };
  loadHtml = (index) => {
    return `<div class="d-flex justify-content-around align-items-center gap-2 position-relative p-4 border">
          <div class="position-absolute top-0 start-0  d-flex justify-content-center align-items-center"
          style="width: 30px; height: 30px; cursor:pointer;" id = "${this.id}">
          <i class="fa-solid fa-xmark icon close-icon" data-product='${JSON.stringify(
            index
          )}' ></i>
          </div>
          <div class="w-25">
<img class="w-100 img-btn"  src="${this.image}" alt="" data-id="${
      this.id
    }">         </div>
                <div class="d-flex flex-column gap-2 justify-content-center align-items-center flex-wrap">
                  <h5 class="m-0">${this.title}</h5>
                  <p class="m-0">Price: <span>${this.quantaty}</span> x <span>${
      this.price
    }</span> : <span>${this.total}</span></p>
                </div>
                 <div class="d-flex flex-row flex-md-column gap-3 justify-content-center align-items-center flex-wrap">
            <i class="fa-solid fa-up-long icon add-icon" style="cursor:pointer;" data-product='${JSON.stringify(
              index
            )}'></i>
            <i class="fa-solid fa-down-long icon decrease-icon" style="cursor:pointer;" data-product='${JSON.stringify(
              index
            )}'></i>
          </div>
              </div>`;

    return `<div class="d-flex justify-content-around align-items-center gap-2 position-relative p-4 border" data-id=${
      this.id
    }>
    <div class="position-absolute top-0 start-0  d-flex justify-content-center align-items-center"
    style="width: 30px; height: 30px; cursor:pointer;">
    <i class="fa-solid fa-xmark icon close-icon" data-product='${JSON.stringify(
      index
    )}' ></i>
    </div>
    <div class="w-25">
     <img class="w-100 img-btn"  src="${this.image}" alt="" data-id="${
      this.id
    }">
   </div>
          <div class="d-flex flex-column gap-2 justify-content-center align-items-center flex-wrap">
            <h5 class="m-0">${this.title}</h5>
            <p class="m-0">Price: <span>${this.quantaty}</span> x <span>${
      this.price
    }</span> : <span>${this.total}</span></p>
          </div>
          <div class="d-flex flex-row flex-md-column gap-3 justify-content-center align-items-center flex-wrap">
            <i class="fa-solid fa-up-long icon add-icon" style="cursor:pointer;" data-product='${JSON.stringify(
              index
            )}'></i>
            <i class="fa-solid fa-down-long icon decrease-icon" style="cursor:pointer;" data-product='${JSON.stringify(
              index
            )}'></i>
          </div>
        </div>`;
  };

  increase = () => {
    if (this.quantaty < this.stock) {
      this.quantaty++;
      this.calculateTotal();
    } else console.log("Out of stock");
  };

  decrease = () => {
    this.quantaty--;
    this.calculateTotal();
  };
}
