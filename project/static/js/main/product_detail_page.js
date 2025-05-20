/* product detail page - JS */
document.addEventListener("DOMContentLoaded", function () {
  const plusBtn = document.querySelector(".plus-btn");
  const minusBtn = document.querySelector(".minus-btn");
  const quantitySpan = document.querySelector(".quantity");
  const totalPrize = document.querySelector(".total-prize");
  const priceText = document.querySelector(
    ".product-detail-discountprice"
  ).textContent;

  const unitPrice = parseInt(priceText.replace(/[^0-9]/g, ""));
  let quantity = 1;

  function updateTotal() {
    const total = unitPrice * quantity;
    totalPrize.textContent = total.toLocaleString() + " 원";
  }

  plusBtn.addEventListener("click", function () {
    quantity++;
    quantitySpan.textContent = quantity;
    updateTotal();
  });

  minusBtn.addEventListener("click", function () {
    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
      updateTotal();
    }
  });

  updateTotal();
});
