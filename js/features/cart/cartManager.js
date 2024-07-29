import CartItem from "../cart/cartItem.js";

export default class CartManager {
  constructor() {
    this.cartList = $("#cart-list");
    this.cartItems = [];
    this.#loadData();
    this.#loadCart();
    this.#updateCartItem();
    this.#handelToggleCart();
  }

  #loadData = function () {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      data.map((item) => {
        let product = new CartItem(item, item.quantaty);
        this.cartItems.push(product);
      });
    }
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("data", JSON.stringify(this.cartItems));
    });
  };
  #handelToggleCart = function () {
    $("#cart-number").html(this.cartItems.length);
    $("#cart-btn").on("click", function () {
      $("#cart-element").css("right", "0px");
    });
    $("#close-btn").on("click", function () {
      $("#cart-element").css("right", "-100%");
    });
    $("#home-btn").on("click", function () {
      window.location.href = `../index.html`;
    });
  };
  #loadCart = function () {
    if (this.cartItems.length == 0) {
      this.cartList.html("<div>no data added! </div>");
    } else
    this.cartList.html(
      this.cartItems
      .map((item, index) => {
        return item.loadHtml(index);
      })
      .join("")
    );
    // console.log(this.cartList.html());
        $("#cart-number").html(this.cartItems.length);

  };

  //add to cart
  addToCart = function (product) {
    let index = this.cartItems.findIndex((item) => item.id === product.id);
    if (index === -1) {
      let cartItem = new CartItem(product);
      // cartItem.calculateTotal();
      this.cartItems.push(cartItem);
    } else {
      this.cartItems[index].quantaty++;
      this.cartItems[index].calculateTotal();
    }
    this.#loadCart();
  };
  //delete
  #deleteFromCart = function (index) {
    try {
      if (index === -1) {
        throw new Error("no product to delete");
      } else {
        this.cartItems.splice(index, 1);
      }
    } catch (e) {
      console.log(e);
    }
    this.#loadCart();
  };

  //increase
  #increase = function (index) {
    this.cartItems[index].increase();
    this.#loadCart();
  };

  //decrease
  #decrease = function (index) {
    this.cartItems[index].decrease();
    if (this.cartItems[index].quantaty <= 0) this.cartItems.splice(index, 1);
    this.#loadCart();
  };

  #updateCartItem = () => {
    this.cartList.on("click", (e) => {
      const target = $(e.target);
      if (target.attr("data-product")) {
        const index = JSON.parse(target.attr("data-product"));
        if (target.hasClass("close-icon")) {
          this.#deleteFromCart(index);
        } else if (target.hasClass("add-icon")) {
          this.#increase(index);
        } else if (target.hasClass("decrease-icon")) {
          this.#decrease(index);
        }
      }
      if ($(e.target).hasClass("img-btn")) {
        const itemId = target.attr("data-id");
        const path = target.attr("path");
        const pahtName = `${window.location.pathname}`;
        if (pahtName.includes("movie.html")) {
          window.location.href = `movie.html?id=${itemId}`;
        } else {
          window.location.href = `html/movie.html?id=${itemId}`;
        }
        // console.log(rootUrl);
      }
    });
  };
}

//cartItem
