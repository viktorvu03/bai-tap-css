function handleTagClick(event) {
  const selectedTag = event.target;
  const contentDiv = document.querySelector(".content-green");
  
  // Cập nhật giao diện thẻ được chọn
  document.querySelectorAll(".tag-content-green button").forEach(tag => {
    tag.style.borderBottom = tag === selectedTag ? "2px solid rgb(0, 184, 132)" : "none";
    tag.classList.toggle("unselected", tag !== selectedTag);
  });

  // Đường dẫn nội dung tương ứng với thẻ
  const contentPaths = {
    "Báo Cáo Học Tập": "./green/content1.html",
    "Bài Tập & Kiểm Tra": "./green/content2.html",
    "Chấm Bài & Trả Bài": "./green/content3.html"
  };

  // Tải nội dung
  fetch(contentPaths[selectedTag.innerText] || "")
    .then(response => response.ok ? response.text() : Promise.reject())
    .then(data => contentDiv.innerHTML = data)
    .catch(() => contentDiv.innerHTML = "<p>Chọn một thẻ để xem nội dung.</p>");
}

document.querySelectorAll(".tag-content-green button").forEach(tag => {
  tag.addEventListener("click", handleTagClick);
});

// Đặt mặc định thẻ đầu tiên
handleTagClick({ target: document.querySelector(".tag-content-green button") });

// Các nút cuộn
const tagContentGreen = document.querySelector(".tag-content-green");
const scrollLeftButtonGreen = document.querySelector(".scroll-left-green");
const scrollRightButtonGreen = document.querySelector(".scroll-right-green");

// Sự kiện cuộn
scrollLeftButtonGreen.addEventListener("click", () => tagContentGreen.scrollBy({ left: -300, behavior: "smooth" }));
scrollRightButtonGreen.addEventListener("click", () => tagContentGreen.scrollBy({ left: 300, behavior: "smooth" }));

// Cập nhật hiển thị các nút cuộn
function updateScrollButtonsGreen() {
  const isFullyVisibleGreen = tagContentGreen.scrollWidth <= tagContentGreen.clientWidth;
  const isScrolledToLeftGreen = tagContentGreen.scrollLeft === 0;
  const isScrolledToRightGreen = tagContentGreen.scrollLeft + tagContentGreen.clientWidth >= tagContentGreen.scrollWidth - 50;

  scrollLeftButtonGreen.style.display = isFullyVisibleGreen || isScrolledToLeftGreen ? "none" : "block";
  scrollRightButtonGreen.style.display = isFullyVisibleGreen || isScrolledToRightGreen ? "none" : "block";

 
}

// Cập nhật hiển thị nút cuộn khi cuộn hoặc thay đổi kích thước
tagContentGreen.addEventListener("scroll", updateScrollButtonsGreen);
window.addEventListener("resize", updateScrollButtonsGreen);

// Kiểm tra lần đầu để đặt trạng thái nút cuộn
updateScrollButtonsGreen();
