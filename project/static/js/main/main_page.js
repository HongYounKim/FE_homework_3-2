const checkboxes = document.querySelectorAll(".category-input");
const resetBtn = document.getElementById("resetBtn");
const resetImg = document.querySelector(".reset-img");
const productBar = document.querySelector(".product-bar");
const selectedTags = document.querySelector(".selected-tags");

function createCloseSvg() {
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.setAttribute("fill", "none");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M9.99992 11.1668L5.91659 15.2502C5.76381 15.4029 5.56936 15.4793 5.33325 15.4793C5.09714 15.4793 4.9027 15.4029 4.74992 15.2502C4.59714 15.0974 4.52075 14.9029 4.52075 14.6668C4.52075 14.4307 4.59714 14.2363 4.74992 14.0835L8.83325 10.0002L4.74992 5.91683C4.59714 5.76405 4.52075 5.56961 4.52075 5.3335C4.52075 5.09738 4.59714 4.90294 4.74992 4.75016C4.9027 4.59738 5.09714 4.521 5.33325 4.521C5.56936 4.521 5.76381 4.59738 5.91659 4.75016L9.99992 8.8335L14.0833 4.75016C14.236 4.59738 14.4305 4.521 14.6666 4.521C14.9027 4.521 15.0971 4.59738 15.2499 4.75016C15.4027 4.90294 15.4791 5.09738 15.4791 5.3335C15.4791 5.56961 15.4027 5.76405 15.2499 5.91683L11.1666 10.0002L15.2499 14.0835C15.4027 14.2363 15.4791 14.4307 15.4791 14.6668C15.4791 14.9029 15.4027 15.0974 15.2499 15.2502C15.0971 15.4029 14.9027 15.4793 14.6666 15.4793C14.4305 15.4793 14.236 15.4029 14.0833 15.2502L9.99992 11.1668Z"
  );
  path.setAttribute("fill", "#DDDDDD");

  svg.appendChild(path);

  return svg;
}

// 숫자에 콤마 추가 함수
function addComma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 페이지 내 상품 가격들 콤마 찍기
function formatPrices() {
  const originPrices = document.querySelectorAll(".product-origin-price");
  originPrices.forEach((elem) => {
    const text = elem.textContent.trim();
    const num = parseInt(text.replace(/[^0-9]/g, ""));
    if (!isNaN(num)) {
      elem.textContent = addComma(num) + "원";
    }
  });

  const discountPrices = document.querySelectorAll(".product-discountprice");
  discountPrices.forEach((elem) => {
    const text = elem.textContent.trim();
    const num = parseInt(text.replace(/[^0-9]/g, ""));
    if (!isNaN(num)) {
      elem.textContent = addComma(num) + "원";
    }
  });
}

function updateUI() {
  const selected = Array.from(checkboxes).filter((cb) => cb.checked);

  // 초기화 버튼 상태 및 색상 변경
  resetBtn.disabled = selected.length === 0;
  resetBtn.style.color = selected.length === 0 ? "#DDDDDD" : "#999";

  const resetPath = document.querySelector(".reset-path");
  if (resetPath) {
    resetPath.setAttribute("fill", selected.length === 0 ? "#DDDDDD" : "#999");
  }

  // 총 개수 합산
  let totalCount = 0;
  selected.forEach((cb) => {
    const countElem = cb.parentElement.querySelector(".category-count");
    const count = parseInt(countElem.textContent);
    totalCount += count;
  });

  // product-bar 내 텍스트 변경 (총 XX건)
  const productBarText = productBar.querySelector(".text");
  if (productBarText) {
    productBarText.textContent = `총 ${totalCount}건`;
  }

  // 선택된 태그 초기화
  selectedTags.innerHTML = "";

  if (selected.length === 0) {
    selectedTags.style.display = "none";
  } else {
    selectedTags.style.display = "flex";

    selected.forEach((cb) => {
      const categoryName =
        cb.parentElement.querySelector(".category-item").textContent;

      const tag = document.createElement("span");
      tag.className = "tag";

      const textSpan = document.createElement("span");
      textSpan.className = "selected-category";
      textSpan.textContent = categoryName;

      const closeBtn = document.createElement("button");
      closeBtn.className = "tag-close-btn";
      closeBtn.title = `${categoryName} 선택 해제`;
      closeBtn.type = "button";

      const closeSvg = createCloseSvg();
      closeBtn.appendChild(closeSvg);

      closeBtn.onclick = () => {
        cb.checked = false;
        updateUI();
      };

      tag.appendChild(textSpan);
      tag.appendChild(closeBtn);
      selectedTags.appendChild(tag);
    });
  }
}

// 체크박스 이벤트 등록
checkboxes.forEach((cb) =>
  cb.addEventListener("change", () => {
    updateUI();
    formatPrices(); // 선택이 바뀔 때마다 가격 포맷도 갱신
  })
);

// 초기화 버튼 및 이미지 클릭 초기화
resetBtn.addEventListener("click", () => {
  checkboxes.forEach((cb) => (cb.checked = false));
  updateUI();
  formatPrices();
});
resetImg.addEventListener("click", () => {
  checkboxes.forEach((cb) => (cb.checked = false));
  updateUI();
  formatPrices();
});

// 초기 로딩 시 UI 및 가격 포맷 업데이트
updateUI();
formatPrices();
