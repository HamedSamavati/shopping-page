const products = document.querySelectorAll(".product");
const searchNameInput = document.getElementById("search-name-input");
const searchBtn = document.getElementById("search-btn");
const allBtn = document.querySelector("#all-btn");
const techBtn = document.querySelector("#tech-btn");
const clothingBtn = document.querySelector("#clothing-btn");
const healthBtn = document.querySelector("#health-btn");
const btns = [allBtn, techBtn, healthBtn, clothingBtn];

const searchNameHandler = (event) => {
  const name = event.target.value.toLowerCase().trim();
  products.forEach((product) => {
    const productName = product.children[1].innerText.toLowerCase();
    productName.includes(name)
      ? (product.style.display = "")
      : (product.style.display = "none");
  });
};
searchNameInput.addEventListener("keyup", searchNameHandler);

const searchPriceHandler = (event) => {
  const searchPriceInput = document.querySelector("#search-price-input");
  const searchedPrice = searchPriceInput.value;
  searchPriceInput.value = "";
  products.forEach((product) => {
    if (searchedPrice === "") product.style.display = "";
    else {
      +product.children[2].lastChild.data === +searchedPrice &&
      product.style.display !== "none"
        ? (product.style.display = "")
        : (product.style.display = "none");
    }
  });
};
searchBtn.addEventListener("click", searchPriceHandler);

const deactivateBtns = (selfBtn) => {
  btns.forEach((btn) => {
    if (btn.classList.contains("active") || btn === selfBtn) {
      btn.classList.toggle("active");
    }
  });
};

const showRelatedProducts = (btn) => {
  products.forEach((product) => {
    if (btn.classList.contains("active")) {
      product.dataset.category === btn.dataset.category
        ? (product.style.display = "")
        : (product.style.display = "none");
    } else {
      if (product.dataset.category !== btn.dataset.category)
        product.style.display = "";
    }
  });
};

const filterHandler = (event) => {
  const filter = event.target;
  deactivateBtns(filter);
  filter === allBtn && allBtn.classList.contains("active")
    ? products.forEach((product) => (product.style.display = ""))
    : showRelatedProducts(filter);
};

btns.forEach((btn) => {
  btn.addEventListener("click", filterHandler);
});
